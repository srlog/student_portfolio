import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import masterAPI from '../../services/master.api.service';
import Navbar from '../../components/Layout/Navbar';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAchievements: 0,
    departmentStats: [],
    recentActivity: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await masterAPI.getDashboardData();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="master" />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Master Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Students</h2>
            <p className="text-4xl font-bold text-primary-500">{stats.totalStudents}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Achievements</h2>
            <p className="text-4xl font-bold text-primary-500">{stats.totalAchievements}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Departments</h2>
            <p className="text-4xl font-bold text-primary-500">{stats.departmentStats.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Department Statistics</h2>
              <Link to="/master/analytics" className="text-primary-600 hover:text-primary-700">
                View Details
              </Link>
            </div>
            <div className="space-y-4">
              {stats.departmentStats.map((dept) => (
                <div key={dept.id} className="flex justify-between items-center">
                  <span className="text-gray-600">{dept.name}</span>
                  <span className="text-primary-600">{dept.studentCount} students</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              <Link to="/master/reports" className="text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="border-b border-gray-200 pb-2">
                  <p className="text-gray-800">{activity.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;