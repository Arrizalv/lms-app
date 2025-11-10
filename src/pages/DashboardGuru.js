    import React, { useState, useEffect } from 'react';
    import Navbar from '../components/Navbar';
    import Sidebar from '../components/Sidebar';

     const DashboardGuru = () => {
       const [courses, setCourses] = useState([]);
       const [newCourse, setNewCourse] = useState({ title: '', description: '' });

       useEffect(() => {
        fetchCourses();
       }, []);

       const fetchCourses = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/courses`);
          const data = await res.json();
          setCourses(data);
        } catch (err) {
          console.error(err);
        }
       };

       const addCourse = async () => {
        try {
          // get logged-in user id from localStorage if stored by login
          const stored = localStorage.getItem('user');
          let teacher_id = null;
          if (stored) {
            try { teacher_id = JSON.parse(stored).id; } catch (e) {}
          }
          const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newCourse.title, description: newCourse.description, teacher_id }),
          });
          if (!res.ok) throw new Error('Failed to add course');
          setNewCourse({ title: '', description: '' });
          fetchCourses();
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
               <h1 className="text-3xl mb-4">Dashboard Guru</h1>
               <div className="mb-4">
                 <input
                   type="text"
                   placeholder="Judul Kursus"
                   value={newCourse.title}
                   onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                   className="p-2 border rounded mr-2"
                 />
                 <input
                   type="text"
                   placeholder="Deskripsi"
                   value={newCourse.description}
                   onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                   className="p-2 border rounded mr-2"
                 />
                 <button onClick={addCourse} className="bg-green-500 text-white p-2 rounded">Tambah Kursus</button>
               </div>
               <ul className="list-disc pl-5">
                 {courses.map((course) => (
                   <li key={course.id} className="mb-2">{course.title}: {course.description}</li>
                 ))}
               </ul>
             </div>
           </div>
         </div>
       );
     };

     export default DashboardGuru;
     