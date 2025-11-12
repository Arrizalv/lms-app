const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// -----------------------------
// REGISTER (untuk guru & siswa)
// -----------------------------
router.post("/signup", async (req, res) => {
  try {
    const { role, name, email, password } = req.body;

    if (!role || !name || !email || !password) {
      return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    // Cek role valid atau tidak
    if (role !== "teacher" && role !== "student") {
      return res.status(400).json({ message: "Role harus teacher atau student" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tentukan tabel berdasarkan role
    const table = role === "teacher" ? "teachers" : "students";

    // Cek apakah email sudah terdaftar
    db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length > 0) {
        return res.status(400).json({ message: "Email sudah terdaftar!" });
      }

      // Masukkan ke database
      db.query(
        `INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword],
        (err2, result2) => {
          if (err2) return res.status(500).json(err2);
          return res.status(201).json({ message: `${role} berhasil terdaftar!` });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

// -----------------------------
// LOGIN (untuk guru & siswa)
// -----------------------------
router.post("/login", (req, res) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  if (role !== "teacher" && role !== "student") {
    return res.status(400).json({ message: "Role tidak valid!" });
  }

  const table = role === "teacher" ? "teachers" : "students";

  db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) {
      return res.status(400).json({ message: "Email tidak ditemukan!" });
    }

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah!" });
    }

    // Buat JWT token
    const token = jwt.sign(
      { id: user.id || user.teacher_id || user.student_id, role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login berhasil!",
      token,
      user: {
        id: user.id || user.teacher_id || user.student_id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  });
});

module.exports = router;
