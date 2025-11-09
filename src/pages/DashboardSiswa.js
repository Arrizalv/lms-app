import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardSiswa = () => {
  const courses = ['Matematika', 'Bahasa Inggris']; // Mock data
  const tasks = ['Tugas 1: Aljabar', 'Tugas 2: Grammar']; // Mock data

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl mb-4">Dashboard Siswa</h1>
          <h2 className="text-xl mb-2">Kursus Saya</h2>
          <ul className="list-disc pl-5 mb-4">
            {courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
          <h2 className="text-xl mb-2">Tugas</h2>
          <ul className="list-disc pl-5">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSiswa;