const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Helper to create users table if not exists (simple)
async function ensureTables() {
  const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  await pool.query(createUsers);
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    await ensureTables();
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashed, role || 'siswa']);
    const userId = result.insertId;
    const token = jwt.sign({ id: userId, email, role: role || 'siswa' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ id: userId, email, role: role || 'siswa', token });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already exists' });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const [rows] = await pool.query('SELECT id, email, password, role FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ id: user.id, email: user.email, role: user.role, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
