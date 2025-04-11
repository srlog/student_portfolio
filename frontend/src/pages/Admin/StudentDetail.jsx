import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import adminAPI from '../../services/admin.api.service';
import achievementAPI from '../../services/achievement.api.service';
import Navbar from '../../components/Layout/Navbar';

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudentData();
  }, [id]);

  const loadStudentData = async () => {
    try {
      const [studentResponse, achievementsResponse] = await Promise.all([
        adminAPI.getStudentDetails(id),
        achievementAPI.getByStudentId(id)
      ]);
      setStudent(studentResponse.data);
      setAchievements(achievementsResponse.data);
    } catch (error) {
      toast.error('Failed to load student details');
      navigate('/admin/students');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !student) {
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
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/students')}
            className="text-primary-600 hover:text-primary-700"
          >
            ← Back to Students
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{student.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Email: {student.email}</p>
              <p className="text-gray-600">Department: {student.department}</p>
              <p className="text-gray-600">Year: {student.year}</p>
              <p className="text-gray-600">Roll Number: {student.rollNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone: {student.phone}</p>
              <p className="text-gray-600">
                Joined: {new Date(student.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white p-6 rounded-lg shadow border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(achievement.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    achievement.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : achievement.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {achievements.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No achievements found for this student.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;