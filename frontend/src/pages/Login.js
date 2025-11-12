import React, { useState } from "react";
import { login } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login({ role, email, password });

    if (res.token) {
      // Simpan data ke localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      alert(`Selamat datang, ${res.user.name}!`);

      // 🔥 Redirect sesuai role
      if (res.user.role === "teacher") {
        navigate("/dashboard/guru");
      } else if (res.user.role === "student") {
        navigate("/dashboard/siswa");
      }

    } else {
      alert(res.message || "Login gagal. Coba lagi!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login ke LMS
        </h2>

        <form onSubmit={handleSubmit}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
          >
            <option value="">Pilih Role</option>
            <option value="teacher">Guru</option>
            <option value="student">Siswa</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline font-medium"
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
