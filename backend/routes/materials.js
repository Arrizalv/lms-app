const express = require("express");
const router = express.Router();
const db = require("../db");

// Tambah materi
router.post("/", (req, res) => {
  const { teacher_id, title, description, file_url } = req.body;

  if (!teacher_id || !title) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  db.query(
    "INSERT INTO materials (teacher_id, title, description, file_url) VALUES (?, ?, ?, ?)",
    [teacher_id, title, description, file_url],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Materi berhasil ditambahkan!" });
    }
  );
});

// Ambil semua materi untuk siswa
router.get("/", (req, res) => {
  db.query("SELECT * FROM materials ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
