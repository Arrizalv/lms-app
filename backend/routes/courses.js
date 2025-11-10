const express = require('express');
const pool = require('../db');
const router = express.Router();

// Ensure courses table
async function ensureCourses() {
  const sql = `
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      teacher_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  await pool.query(sql);
}

// GET /api/courses?teacher_id=123
router.get('/', async (req, res) => {
  try {
    await ensureCourses();
    const teacherId = req.query.teacher_id;
    let rows;
    if (teacherId) {
      [rows] = await pool.query('SELECT * FROM courses WHERE teacher_id = ?', [teacherId]);
    } else {
      [rows] = await pool.query('SELECT * FROM courses');
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/courses  { title, description, teacher_id }
router.post('/', async (req, res) => {
  try {
    await ensureCourses();
    const { title, description, teacher_id } = req.body;
    if (!title || !teacher_id) return res.status(400).json({ error: 'title and teacher_id required' });
    const [result] = await pool.query('INSERT INTO courses (title, description, teacher_id) VALUES (?, ?, ?)', [title, description || '', teacher_id]);
    const insertedId = result.insertId;
    const [[course]] = await pool.query('SELECT * FROM courses WHERE id = ?', [insertedId]);
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
