import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminPage from '../pages/AdminPage';
import MapPage from '../pages/MapPage';

function RouterApp() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RouterApp;

//RouterApp