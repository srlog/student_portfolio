import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Student Routes
import StudentDashboard from './pages/Student/Dashboard';
import StudentProfile from './pages/Student/Profile';
import Achievements from './pages/Student/Achievements';
import AchievementForm from './pages/Student/AchievementForm';

// Admin Routes
import AdminDashboard from './pages/Admin/Dashboard';
import Approvals from './pages/Admin/Approvals';
import StudentList from './pages/Admin/StudentList';
import StudentDetail from './pages/Admin/StudentDetail';

// Master Routes
import MasterDashboard from './pages/Master/Dashboard';
import Analytics from './pages/Master/Analytics';
import Reports from './pages/Master/Reports';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/achievements" element={<Achievements />} />
          <Route path="/student/achievements/new" element={<AchievementForm />} />
          <Route path="/student/achievements/edit/:id" element={<AchievementForm />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/approvals" element={<Approvals />} />
          <Route path="/admin/students" element={<StudentList />} />
          <Route path="/admin/students/:id" element={<StudentDetail />} />

          {/* Master Routes */}
          <Route path="/master/dashboard" element={<MasterDashboard />} />
          <Route path="/master/analytics" element={<Analytics />} />
          <Route path="/master/reports" element={<Reports />} />
        </Routes>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;