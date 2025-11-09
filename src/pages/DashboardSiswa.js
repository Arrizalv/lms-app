import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardSiswa = () => {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    const { data: user } = await supabase.auth.getUser();
    // Ambil kursus yang di-enroll siswa
    const { data, error } = await supabase
      .from('enrollments')
      .select('courses(*)')
      .eq('student_id', user.user.id);
    if (error) console.error(error);
    else setCourses(data.map(e => e.courses));

    // Ambil tugas dari kursus tersebut
    const courseIds = data.map(e => e.courses.id);
    const { data: taskData } = await supabase.from('tasks').select('*').in('course_id', courseIds);
    setTasks(taskData);
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