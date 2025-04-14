import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminRoute from './pages/Auth/AdminRoute';
import Unauthorised from './pages/Auth/Unauthorised';

// Student Routes
import StudentDashboard from './pages/Student/Dashboard';
import StudentProfile from './pages/Student/Profile';
import Achievements from './pages/Student/Achievements';

// Admin Routes
import AdminDashboard from './pages/Admin/Dashboard';
import Approvals from './pages/Admin/Approvals';
import StudentList from './pages/Admin/StudentList';
import StudentProfileAdmin from './pages/Admin/StudentProfile';

// Master Routes
import MasterDashboard from './pages/Master/Dashboard';
import Analytics from './pages/Master/Analytics';
import Reports from './pages/Master/Reports';
import MasterApproval from './pages/Master/Approvals';
import MasterStudentList from './pages/Master/StudentList';



import { ToastContainer } from 'react-toastify';
import Footer from './components/Layout/Footer';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path='/unauthorized' element={<Unauthorised/>} />
          {/* Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/achievements" element={<Achievements />} />

          {/* Admin Routes */}
          
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/approvals" element={<AdminRoute><Approvals /></AdminRoute>} />
          <Route path="/admin/students" element={<AdminRoute><StudentList /></AdminRoute>} />
          <Route path="/admin/students/:studentId" element={<AdminRoute><StudentProfileAdmin /></AdminRoute>} />

          {/* Master Routes */}
          <Route path="/master/dashboard" element={<MasterDashboard />} />
          <Route path="/master/approvals" element={<MasterApproval />} />
          <Route path="/master/students" element={<MasterStudentList />} />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;