import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardSiswa() {
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submission, setSubmission] = useState({ assignment_id: "", file_url: "" });
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

  const submitTask = async () => {
    await axios.post("/api/assignments/submit", {
      ...submission,
      student_id: user.id,
    });
    alert("Tugas berhasil dikumpulkan!");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Siswa</h1>

      {/* Materi */}
      <section>
        <h2 className="font-semibold mb-2">Materi Terbaru</h2>
        <ul>
          {materials.map(m => (
            <li key={m.material_id}>
              <a href={m.file_url} target="_blank" rel="noreferrer" className="text-blue-500">
                {m.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Tugas */}
      <section>
        <h2 className="font-semibold mb-2">Tugas Aktif</h2>
        <select onChange={e => setSubmission({ ...submission, assignment_id: e.target.value })}>
          <option>Pilih tugas...</option>
          {assignments.map(a => (
            <option key={a.assignment_id} value={a.assignment_id}>{a.title}</option>
          ))}
        </select>
        <input placeholder="Link file (Google Drive, dll)" className="border p-2" onChange={e => setSubmission({ ...submission, file_url: e.target.value })} />
        <button className="bg-blue-600 text-white p-2 rounded" onClick={submitTask}>Kumpulkan</button>
      </section>
    </div>
  );
}
