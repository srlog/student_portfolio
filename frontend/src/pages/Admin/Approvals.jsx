import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import achievementAPI from '../../services/achievement.api.service';
import Navbar from '../../components/Layout/Navbar';

function Approvals() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const response = await achievementAPI.getAll();
      setAchievements(response.data);
    } catch (error) {
      toast.error('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await achievementAPI.approve(id, { status: 'approved' });
      toast.success('Achievement approved successfully');
      loadAchievements();
    } catch (error) {
      toast.error('Failed to approve achievement');
    }
  };

  const handleReject = async (id) => {
    try {
      await achievementAPI.approve(id, { status: 'rejected' });
      toast.success('Achievement rejected successfully');
      loadAchievements();
    } catch (error) {
      toast.error('Failed to reject achievement');
    }
  };

  const filteredAchievements = achievements.filter(
    achievement => filter === 'all' || achievement.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar role="admin" />
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="admin" />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Achievement Approvals</h1>
        
        <div className="mb-6">
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600 mb-4">{achievement.description}</p>
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Student: {achievement.student.name}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(achievement.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Type: {achievement.type}
                </p>
              </div>
              {achievement.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(achievement.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(achievement.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Reject
                  </button>
                </div>
              )}
              {achievement.status !== 'pending' && (
                <span className={`px-2 py-1 rounded-full text-sm ${
                  achievement.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {filteredAchievements.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No achievements found matching the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}

export default Approvals;