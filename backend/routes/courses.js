const express = require("express");
const router = express.Router();
const db = require("../db");

// Ambil semua course
router.get("/", (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Tambah course baru
router.post("/", (req, res) => {
  const { title, description, teacher_id } = req.body;
  db.query(
    "INSERT INTO courses (title, description, teacher_id) VALUES (?, ?, ?)",
    [title, description, teacher_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Course added" });
    }
  );
});

module.exports = router;
