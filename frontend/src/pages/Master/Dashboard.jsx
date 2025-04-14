import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Layout/Navbar"; // adjust imports as needed
import Modal from "../../components/Modal";
import masterAPI from "../../services/master.api.service"; // adjust the API import as needed

const ConfirmPassword = ({ setIsOpen }) => {
  const initialProfile = {
    oldPassword: "",
    email: JSON.parse(localStorage.getItem("user")).email,
    confirmPassword: "",
    newPassword: "",
  };

  const [formData, setFormData] = useState(initialProfile);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const updatedProfile = {
        email: formData.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      await MasterAPI.updatePassword(updatedProfile);
      toast.success("Password updated successfully!");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Confirm Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-gray-700 font-medium"
          >
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Old Password"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="newPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="New Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition-colors"
        >
          Confirm Password
        </button>
      </form>
    </div>
  );
};

function Dashboard() {
  // We'll maintain the entire dashboard data in state.
  // Default values are set to match the expected response structure.
  const [dashboardData, setDashboardData] = useState({
    master: {},
    top_students: [],
    recent_achievements: [],
    // If you still need summary stats that aren't in your response,
    // you can compute them below
    totalStudents: 0,
    pendingAchievements: 0,
    recentRegistrations: 0,
  });

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await masterAPI.getProfile();
      // Assuming the response data includes keys: admin, top_students, recent_achievements.
      const data = response.data;

      // If you need to compute extra summary values, you might do so here.
      // For example:
      const totalStudents = data.top_students ? data.top_students.length : 0;
      // If pending achievements is a count from admin profile:
      const pendingAchievements = data.master?.not_approved_achievements || 0;
      // You might calculate recentRegistrations based on your own criteria,
      // here we assume it's provided:
      const recentRegistrations = data.recentRegistrations || 0;

      setDashboardData({
        ...data,
        totalStudents,
        pendingAchievements,
        recentRegistrations,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    }
  };
  const name = JSON.parse(localStorage.getItem("user")).name;

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="master" name={name} />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Master Dashboard
        </h1>
        {/* Summary Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Total Students
            </h2>
            <p className="text-4xl font-bold text-primary-500">
              {dashboardData.totalStudents}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pending Approvals
            </h2>
            <p className="text-4xl font-bold text-primary-500">
              {dashboardData.pendingAchievements}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Total Acheivements
            </h2>
            <p className="text-4xl font-bold text-primary-500">
              {dashboardData.master?.achievements}
            </p>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="card p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/master/approvals/"
              className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
            >
              <h3 className="font-medium text-primary-700 group-hover:text-primary-800">
                Approve Achievements
              </h3>
              <p className="text-sm text-primary-600 mt-1">
                Approve pending achievements
              </p>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <h3 className="font-medium text-green-700 group-hover:text-green-800">
                Update Password
              </h3>
              <p className="text-sm text-green-600 mt-1">
                Keep your info up to date
              </p>
            </button>
          </div>
        </div>

        {/* Top Students & Recent Achievements Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Students */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Top Students
              </h2>
              <Link
                to="/master/students"
                className="text-primary-600 hover:text-primary-700"
              >
                View All
              </Link>
            </div>
            {dashboardData.top_students.length > 0 ? (
              <ul>
                {dashboardData.top_students.map((student) => (
                  <li key={student.id} className="mb-4 border-b pb-2">
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          student.profile_picture || "/assets/images/avatar.jpg"
                        }
                        alt={student.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-gray-600">
                          Reg No: {student.reg_no} | Department: {student.department} | Year: {student.year} |
                          Section: {student.section}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total Achievements: {student.total_achievements || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Link
                        to={`/admin/students/${student.id}`}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-full"
                      >
                        View Profile
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No student data available.</p>
            )}
          </div>

          {/* Recent Achievements */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Achievements
              </h2>
              <Link
                to="/Master/approvals"
                className="text-primary-600 hover:text-primary-700"
              >
                View All
              </Link>
            </div>
            {dashboardData.recent_achievements.length > 0 ? (
              <ul>
                {dashboardData.recent_achievements.map((achievement) => (
                  <li key={achievement.id} className="mb-4 border-b pb-2">
                    <p className="font-semibold">
                      {achievement.title} -{" "}
                      <span className="text-sm">{achievement.type}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Issued by: {achievement.issued_by} on{" "}
                      {new Date(achievement.issued_date).toLocaleDateString()}
                    </p>
                    {achievement.achievementStudent && (
                      <p className="text-sm text-gray-600">
                        Student: {achievement.achievementStudent.name} (
                        {achievement.achievementStudent.email})
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No recent achievements available.</p>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <ConfirmPassword setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
}

export default Dashboard;
