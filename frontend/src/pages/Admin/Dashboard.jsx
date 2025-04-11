import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import adminAPI from '../../services/admin.api.service';
import Navbar from '../../components/Layout/Navbar';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingAchievements: 0,
    recentRegistrations: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="admin" />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Students</h2>
            <p className="text-4xl font-bold text-primary-500">{stats.totalStudents}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Approvals</h2>
            <p className="text-4xl font-bold text-primary-500">{stats.pendingAchievements}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">New Registrations</h2>
            <p className="text-4xl font-bold text-primary-500">{stats.recentRegistrations}</p>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Students</h2>
              <Link to="/admin/students" className="text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            {/* Add student list here */}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Pending Achievements</h2>
              <Link to="/admin/approvals" className="text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            {/* Add achievements list here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;