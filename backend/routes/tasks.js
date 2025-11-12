const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Konfigurasi upload file
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// -----------------------------
// GURU MENAMBAHKAN TUGAS
// -----------------------------
router.post("/create", (req, res) => {
  const { title, description, deadline, teacher_id } = req.body;

  db.query(
    "INSERT INTO tasks (title, description, deadline, teacher_id) VALUES (?, ?, ?, ?)",
    [title, description, deadline, teacher_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Tugas berhasil dibuat!" });
    }
  );
});

// -----------------------------
// SISWA MENGUPLOAD TUGAS
// -----------------------------
router.post("/submit", upload.single("file"), (req, res) => {
  const { student_id, task_id } = req.body;
  const filePath = req.file.filename;

  db.query(
    "INSERT INTO submissions (student_id, task_id, file_path) VALUES (?, ?, ?)",
    [student_id, task_id, filePath],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Tugas berhasil diupload!" });
    }
  );
});

// -----------------------------
// GURU MEMBERI NILAI
// -----------------------------
router.post("/grade", (req, res) => {
  const { submission_id, grade, feedback } = req.body;

  db.query(
    "UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?",
    [grade, feedback, submission_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Nilai berhasil diberikan!" });
    }
  );
});

// -----------------------------
// AMBIL DETAIL TUGAS
// -----------------------------
router.get("/detail/:task_id", (req, res) => {
  const { task_id } = req.params;

  db.query(
    "SELECT * FROM tasks WHERE id = ?",
    [task_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

module.exports = router;
