import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DashboardGuru from './pages/DashboardGuru';
import DashboardSiswa from './pages/DashboardSiswa';
import { Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Use token/user saved in localStorage by our backend auth
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch (e) { setUser(null); }
    } else if (localStorage.getItem('token')) {
      setUser({ token: localStorage.getItem('token') });
    } else {
      setUser(null);
    }
  }, []);

  const rootElement = (() => {
    if (!user) return <Login />;
    if (user.role === 'guru') return <Navigate to="/dashboard-guru" />;
    return <Navigate to="/dashboard-siswa" />;
  })();

  return (
    <Router>
      <Routes>
        <Route path="/" element={rootElement} />
        <Route path="/dashboard-guru" element={user ? <DashboardGuru /> : <Navigate to="/" />} />
        <Route path="/dashboard-siswa" element={user ? <DashboardSiswa /> : <Navigate to="/" />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;