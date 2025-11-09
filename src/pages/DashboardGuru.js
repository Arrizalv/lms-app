     import React, { useState, useEffect } from 'react';
     import { supabase } from '../utils/supabase';
     import Navbar from '../components/Navbar';
     import Sidebar from '../components/Sidebar';

     const DashboardGuru = () => {
       const [courses, setCourses] = useState([]);
       const [newCourse, setNewCourse] = useState({ title: '', description: '' });

       useEffect(() => {
         fetchCourses();
       }, []);

       const fetchCourses = async () => {
         const { data, error } = await supabase.from('courses').select('*');
         if (error) console.error(error);
         else setCourses(data);
       };

       const addCourse = async () => {
         const { data: user } = await supabase.auth.getUser();
         const { error } = await supabase.from('courses').insert([{
           title: newCourse.title,
           description: newCourse.description,
           teacher_id: user.user.id,
         }]);
         if (!error) {
           setNewCourse({ title: '', description: '' });
           fetchCourses();
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
     