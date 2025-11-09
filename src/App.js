import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardGuru from './pages/DashboardGuru';
import DashboardSiswa from './pages/DashboardSiswa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard-guru" element={<DashboardGuru />} />
        <Route path="/dashboard-siswa" element={<DashboardSiswa />} />
      </Routes>
    </Router>
  );
}

export default App;