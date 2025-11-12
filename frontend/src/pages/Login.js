import React, { useState } from "react";
import { login } from "../utils/auth";

function Login() {
  const [form, setForm] = useState({
    role: "student",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", form.role);
      alert("Login berhasil!");
      window.location.href =
        form.role === "teacher" ? "/dashboard-guru" : "/dashboard-siswa";
    } else {
      alert(res.message || "Login gagal!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
