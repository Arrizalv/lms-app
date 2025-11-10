import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

const Login = () => {
  // Deklarasi state di sini (ini yang hilang!)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('siswa'); // Tambahkan ini jika belum ada
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      // backend returns role
      navigate(user.role === 'guru' ? '/dashboard-guru' : '/dashboard-siswa');
    } catch (error) {
      alert('Login gagal: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Login LMS</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select
          value={role}  // Baris 46: role digunakan di sini
          onChange={(e) => setRole(e.target.value)}  // Baris 47: setRole digunakan di sini
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="siswa">Siswa</option>
          <option value="guru">Guru</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;