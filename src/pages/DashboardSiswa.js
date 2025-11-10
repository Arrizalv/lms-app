import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardSiswa = () => {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const stored = localStorage.getItem('user');
      let student_id = null;
      if (stored) {
        try { student_id = JSON.parse(stored).id; } catch (e) {}
      }
      if (!student_id) return;
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/enrollments?student_id=${student_id}`);
      const enrolled = await res.json();
      setCourses(enrolled || []);

      const ids = (enrolled || []).map(c => c.id).join(',');
      if (ids) {
        const tRes = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/tasks?course_ids=${ids}`);
        const taskData = await tRes.json();
        setTasks(taskData || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl mb-4">Dashboard Siswa</h1>
          <h2 className="text-xl mb-2">Kursus Saya</h2>
          <ul className="list-disc pl-5 mb-4">
            {courses.map((course) => (
              <li key={course.id}>{course.title}</li>
            ))}
          </ul>
          <h2 className="text-xl mb-2">Tugas</h2>
          <ul className="list-disc pl-5">
            {tasks.map((task) => (
              <li key={task.id}>{task.title} - Due: {task.due_date}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSiswa;