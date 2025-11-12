const express = require("express");
const router = express.Router();
const db = require("../db");

// Tambah tugas (guru)
router.post("/", (req, res) => {
  const { teacher_id, title, description, deadline } = req.body;
  if (!teacher_id || !title) return res.status(400).json({ message: "Data tidak lengkap" });

  db.query(
    "INSERT INTO assignments (teacher_id, title, description, deadline) VALUES (?, ?, ?, ?)",
    [teacher_id, title, description, deadline],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Tugas berhasil dibuat!" });
    }
  );
});

// Ambil semua tugas untuk siswa
router.get("/", (req, res) => {
  db.query("SELECT * FROM assignments ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Siswa submit tugas
router.post("/submit", (req, res) => {
  const { assignment_id, student_id, file_url } = req.body;
  if (!assignment_id || !student_id) return res.status(400).json({ message: "Data tidak lengkap" });

  db.query(
    "INSERT INTO submissions (assignment_id, student_id, file_url) VALUES (?, ?, ?)",
    [assignment_id, student_id, file_url],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Tugas berhasil dikumpulkan!" });
    }
  );
});

// Guru melihat pengumpulan dan memberi nilai
router.put("/grade/:submission_id", (req, res) => {
  const { submission_id } = req.params;
  const { grade, feedback } = req.body;

  db.query(
    "UPDATE submissions SET grade = ?, feedback = ? WHERE submission_id = ?",
    [grade, feedback, submission_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Nilai berhasil diberikan!" });
    }
  );
});

module.exports = router;
