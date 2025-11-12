import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardGuru() {
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ title: "", description: "", file_url: "" });
  const [newAssignment, setNewAssignment] = useState({ title: "", description: "", deadline: "" });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const mats = await axios.get("/api/materials");
    const tasks = await axios.get("/api/assignments");
    setMaterials(mats.data);
    setAssignments(tasks.data);
  };

  const addMaterial = async () => {
    await axios.post("/api/materials", {
      ...newMaterial,
      teacher_id: user.id,
    });
    fetchData();
  };

  const addAssignment = async () => {
    await axios.post("/api/assignments", {
      ...newAssignment,
      teacher_id: user.id,
    });
    fetchData();
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Guru</h1>

      {/* Upload Materi */}
      <section>
        <h2 className="font-semibold mb-2">Tambah Materi</h2>
        <input placeholder="Judul" className="border p-2" onChange={e => setNewMaterial({ ...newMaterial, title: e.target.value })} />
        <input placeholder="Deskripsi" className="border p-2" onChange={e => setNewMaterial({ ...newMaterial, description: e.target.value })} />
        <input placeholder="URL File" className="border p-2" onChange={e => setNewMaterial({ ...newMaterial, file_url: e.target.value })} />
        <button className="bg-blue-600 text-white p-2 rounded" onClick={addMaterial}>Upload</button>

        <ul>
          {materials.map(m => (
            <li key={m.material_id}>{m.title}</li>
          ))}
        </ul>
      </section>

      {/* Buat Tugas */}
      <section>
        <h2 className="font-semibold mb-2">Buat Tugas</h2>
        <input placeholder="Judul" className="border p-2" onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })} />
        <input placeholder="Deskripsi" className="border p-2" onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })} />
        <input type="datetime-local" className="border p-2" onChange={e => setNewAssignment({ ...newAssignment, deadline: e.target.value })} />
        <button className="bg-green-600 text-white p-2 rounded" onClick={addAssignment}>Tambah</button>

        <ul>
          {assignments.map(a => (
            <li key={a.assignment_id}>{a.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
