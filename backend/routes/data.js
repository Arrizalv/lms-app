const express = require('express');
const pool = require('../db');
const router = express.Router();

// Ensure enrollments and tasks tables
async function ensureTables() {
  const createEnroll = `
    CREATE TABLE IF NOT EXISTS enrollments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id INT NOT NULL,
      course_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  const createTasks = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      course_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      due_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  await pool.query(createEnroll);
  await pool.query(createTasks);
}

// GET /api/enrollments?student_id=123 -> returns courses joined
router.get('/enrollments', async (req, res) => {
  try {
    await ensureTables();
    const studentId = req.query.student_id;
    if (!studentId) return res.status(400).json({ error: 'student_id required' });
    const [rows] = await pool.query(
      `SELECT c.* FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.student_id = ?`,
      [studentId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/tasks?course_ids=1,2,3
router.get('/tasks', async (req, res) => {
  try {
    await ensureTables();
    const courseIds = req.query.course_ids;
    if (!courseIds) return res.status(400).json({ error: 'course_ids required' });
    const ids = courseIds.split(',').map((s) => Number(s)).filter(Boolean);
    if (ids.length === 0) return res.json([]);
    const [rows] = await pool.query(`SELECT * FROM tasks WHERE course_id IN (${ids.map(() => '?').join(',')})`, ids);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
