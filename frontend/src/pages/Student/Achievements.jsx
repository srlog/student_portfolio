import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import achievementAPI from '../../services/achievement.api.service';
import Navbar from '../../components/Layout/Navbar';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const response = await achievementAPI.getByStudentId();
      const data = response.data;

      const flatten = (items, type) => {
        return (data[type] || []).map((item) => ({
          ...item,
          category: type, // Store category
          status: getStatus(item),
          date: item.issued_date,
          description: `${item.specialization} - ${item.issued_by}`,
        }));
      };

      const getStatus = (item) => {
        if (item.approved_by_department && item.approved_by_placement) return 'approved';
        if (!item.approved_by_department && !item.approved_by_placement) return 'pending';
        return 'in review';
      };

      const allAchievements = [
        ...flatten(data.certificates, 'certificate'),
        ...flatten(data.online_courses, 'online_course'),
        ...flatten(data.projects, 'project'),
        ...flatten(data.internships, 'internship'),
        ...flatten(data.paper_presentations, 'paper_presentation'),
      ];

      setAchievements(allAchievements);
    } catch (error) {
      toast.error('Failed to load achievements');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await achievementAPI.delete(id); // Make sure your API supports this
        toast.success('Achievement deleted successfully');
        loadAchievements();
      } catch (error) {
        toast.error('Failed to delete achievement');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar role="student" />
        <div className="max-w-7xl mx-auto p-8 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="student" />
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <Link
            to="/student/achievements/new"
            className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition duration-200"
          >
            Add Achievement
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={`${achievement.category}-${achievement.id}`}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2 capitalize">
                Type: {achievement.category.replace(/_/g, ' ')}
              </p>
              <p className="text-gray-600 mb-4">{achievement.description}</p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(achievement.date).toLocaleDateString()}
                </span>
                <div className="space-x-2">
                  {/* Optional: if edit is supported per type */}
                  {/* <Link
                    to={`/student/achievements/edit/${achievement.category}/${achievement.id}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Edit
                  </Link> */}
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    achievement.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : achievement.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {achievements.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No achievements found. Add your first achievement!
          </div>
        )}
      </div>
    </div>
  );
}

export default Achievements;
