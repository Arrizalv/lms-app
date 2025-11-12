import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardGuru from "./pages/DashboardGuru";
import DashboardSiswa from "./pages/DashboardSiswa";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ambil user dari localStorage jika ada
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Halaman login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman signup */}
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard guru */}
        <Route
          path="/dashboard/guru"
          element={
            user && user.role === "teacher" ? (
              <DashboardGuru />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Dashboard siswa */}
        <Route
          path="/dashboard/siswa"
          element={
            user && user.role === "student" ? (
              <DashboardSiswa />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
