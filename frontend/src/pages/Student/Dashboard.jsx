import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiUser, FiBell, FiTrendingUp, FiBook } from 'react-icons/fi';
import Navbar from '../../components/Layout/Navbar';

function Dashboard() {
  const [stats, setStats] = useState({
    achievements: 12,
    profileCompletion: 80,
    notifications: 3,
    recentAchievements: [
      { id: 1, title: 'Web Development Certificate', date: '2024-03-15', type: 'Technical' },
      { id: 2, title: 'Chess Tournament Winner', date: '2024-03-10', type: 'Sports' },
      { id: 3, title: 'Research Paper Publication', date: '2024-03-05', type: 'Academic' },
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="student" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-4">
            <FiBook className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold">Welcome to MSEC</h1>
              <p className="mt-2 text-primary-100">Track your academic journey and achievements</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 hover:border-primary-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <FiAward className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Achievements</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{stats.achievements}</h3>
              <span className="text-green-500 text-sm font-medium">+2 this month</span>
            </div>
          </div>

          <div className="card p-6 hover:border-green-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiUser className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Profile Completion</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold text-gray-900">{stats.profileCompletion}%</h3>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-green-500 rounded-full transition-all duration-500" 
                  style={{ width: `${stats.profileCompletion}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="card p-6 hover:border-yellow-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiBell className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Notifications</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">{stats.notifications}</h3>
              <span className="text-yellow-500 text-sm font-medium">New updates</span>
            </div>
          </div>

          <div className="card p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Progress</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900">Good</h3>
              <span className="text-blue-500 text-sm font-medium">On track</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
              <Link to="/student/achievements" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                  <span className="badge badge-info">{achievement.type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/student/achievements/new" 
                className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
              >
                <h3 className="font-medium text-primary-700 group-hover:text-primary-800">Add Achievement</h3>
                <p className="text-sm text-primary-600 mt-1">Record a new achievement</p>
              </Link>
              <Link 
                to="/student/profile" 
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
              >
                <h3 className="font-medium text-green-700 group-hover:text-green-800">Update Profile</h3>
                <p className="text-sm text-green-600 mt-1">Keep your info up to date</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;