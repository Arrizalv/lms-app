// backend/routes/data.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// =======================
// Route: GET /api/data/overview
// =======================
router.get("/overview", (req, res) => {
  const stats = {};

  // Hitung jumlah guru
  db.query("SELECT COUNT(*) AS total FROM teachers", (err, teacherResult) => {
    if (err) return res.status(500).json({ message: "Error mengambil data guru", error: err });
    stats.totalTeachers = teacherResult[0].total;

    // Hitung jumlah siswa
    db.query("SELECT COUNT(*) AS total FROM students", (err2, studentResult) => {
      if (err2) return res.status(500).json({ message: "Error mengambil data siswa", error: err2 });
      stats.totalStudents = studentResult[0].total;

      // Hitung jumlah course (opsional, kalau tabelnya belum ada bisa dilewati dulu)
      db.query("SELECT COUNT(*) AS total FROM courses", (err3, courseResult) => {
        if (err3) {
          // Jika tabel courses belum ada, kirim 0
          stats.totalCourses = 0;
        } else {
          stats.totalCourses = courseResult[0].total;
        }

        // Kirim hasil
        res.json({
          message: "Overview data fetched successfully!",
          data: stats,
        });
      });
    });
  });
});

module.exports = router;
