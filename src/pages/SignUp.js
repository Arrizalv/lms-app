import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../utils/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('siswa'); // Default siswa
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  await signUp(email, password, role);
      alert('Sign up berhasil! Silakan login.');
      // Optionally navigate based on role
      navigate('/');
    } catch (error) {
      alert('Sign up gagal: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Sign Up LMS</h2>
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
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="siswa">Siswa</option>
          <option value="guru">Guru</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Sudah punya akun? <a href="/" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;