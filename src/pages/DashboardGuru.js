import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardGuru = () => {
  const [courses, setCourses] = useState(['Matematika', 'Bahasa Inggris']); // Mock data
  const [newCourse, setNewCourse] = useState('');

  const addCourse = () => {
    if (newCourse) {
      setCourses([...courses, newCourse]);
      setNewCourse('');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl mb-4">Dashboard Guru</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tambah Kursus"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="p-2 border rounded mr-2"
            />
            <button onClick={addCourse} className="bg-green-500 text-white p-2 rounded">Tambah</button>
          </div>
          <ul className="list-disc pl-5">
            {courses.map((course, index) => (
              <li key={index} className="mb-2">{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardGuru;