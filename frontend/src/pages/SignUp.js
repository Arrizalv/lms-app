import React, { useState } from "react";
import { signup } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signup({ role, name, email, password });

    if (res.message && res.message.includes("berhasil")) {
      alert("🎉 Pendaftaran berhasil! Silakan login sekarang.");
      navigate("/login");
    } else {
      alert(res.message || "Gagal mendaftar. Coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Daftar Akun Baru
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
          >
            <option value="">Pilih Role</option>
            <option value="teacher">Guru</option>
            <option value="student">Siswa</option>
          </select>

          {/* Nama */}
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Tombol Daftar */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Daftar
          </button>
        </form>

        {/* 🔗 Link ke Login */}
        <p className="mt-6 text-center text-gray-600">
          Sudah punya akun?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Login di sini
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
