import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import achievementAPI from "../../services/achievement.api.service";
import Navbar from "../../components/Layout/Navbar";
import * as Tabs from "@radix-ui/react-tabs";

import AchievementCalendarContainer from "./AchievementCalendarContainer";
function Stat({ label, value, extra }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      {extra ? (
        <div className="w-16 h-16 mt-2">{extra}</div>
      ) : (
        <span className="text-3xl font-bold text-gray-800 mt-2">{value}</span>
      )}
    </div>
  );
}

// ------------------------------------------
// Reusable Modal Component
// ------------------------------------------
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

// ------------------------------------------
// Achievement Form Component (for Create/Edit)
// ------------------------------------------
const AchievementForm = ({
  initialData = {
    type: "", // expected values: certificate, online_course, project, internship, paper_presentation, hackathon
    title: "",
    specialization: "",
    issued_by: "",
    issued_date: "",
  },
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.student_id = JSON.parse(localStorage.getItem("user")).id;
    await onSubmit(formData);
    onClose();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {initialData.id ? " Achievement" : "Add Achievement"}
      </h2>

      <div>
        <label htmlFor="type" className="block text-gray-700 font-medium mb-1">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        >
          <option value="">Select Type</option>
          <option value="certificate">Certificate</option>
          <option value="online_course">Online Course</option>
          <option value="project">Project</option>
          <option value="internship">Internship</option>
          <option value="paper_presentation">Paper Presentation</option>
          <option value="hackathon">Hackathon</option>
        </select>
      </div>
      <div>
        <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>
      <div>
        <label
          htmlFor="specialization"
          className="block text-gray-700 font-medium mb-1"
        >
          Specialization
        </label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>
      <div>
        <label
          htmlFor="issued_by"
          className="block text-gray-700 font-medium mb-1"
        >
          Issued By
        </label>
        <input
          type="text"
          id="issued_by"
          name="issued_by"
          value={formData.issued_by}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>
      <div>
        <label
          htmlFor="issued_date"
          className="block text-gray-700 font-medium mb-1"
        >
          Issued Date
        </label>
        <input
          type="date"
          id="issued_date"
          name="issued_date"
          value={formData.issued_date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {initialData.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

// ------------------------------------------
// Main Achievements Component
// ------------------------------------------
// ------------------------------------------
// Main Achievements Component
// ------------------------------------------

function Achievements() {
  const [profile, setProfile] = useState({});
  const [achievements, setAchievements] = useState({});
  const [activeTab, setActiveTab] = useState("achievements");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  // Load profile and achievements from API
  const loadProfile = async () => {
    try {
      const response = await achievementAPI.getByStudentId();
      if (response.data) {
        setProfile(response.data.student);
        setAchievements(response.data.student.achievements);
      } else {
        toast.error("No profile data found");
      }
    } catch (error) {
      toast.error("Failed to load profile");
      console.error(error);
    }
  };

  // Create a new achievement
  const handleCreateAchievement = async (data) => {
    try {
      await achievementAPI.create(data);
      toast.success("Achievement created successfully!");
      loadProfile();
    } catch (error) {
      toast.error("Failed to create achievement");
      console.error(error);
    }
  };

  // Update an existing achievement
  const handleUpdateAchievement = async (data) => {
    try {
      await achievementAPI.update(editingAchievement.id, data);
      toast.success("Achievement updated successfully!");
      loadProfile();
    } catch (error) {
      toast.error("Failed to update achievement");
      console.error(error);
    }
  };

  // Delete an achievement
  const handleDeleteAchievement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?"))
      return;
    try {
      await achievementAPI.delete(id);
      toast.success("Achievement deleted successfully!");
      loadProfile();
    } catch (error) {
      toast.error("Failed to delete achievement");
      console.error(error);
    }
  };

  // Helper function to render achievements by category without flattening
  const renderAchievements = (category) => {
    const items = profile.achievements[category];
    if (!items || !Array.isArray(items)) return null;
    return (
      <div key={category}>
        <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">
          {category}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 relative"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg text-gray-900">
                  {item.title}
                </h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    item.approved_by_department && item.approved_by_placement
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.approved_by_department && item.approved_by_placement
                    ? "Approved"
                    : "Pending"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {item.specialization}
              </p>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Issued by:</span>{" "}
                  {item.issued_by}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(item.issued_date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {item.type}
                </p>
              </div>
              {/* Action Buttons for Edit/Delete */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingAchievement(item);
                    setShowEditModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit Achievement"
                >
                  <FiEdit className="h-7 w-7" />
                </button>
                <button
                  onClick={() => handleDeleteAchievement(item.id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete Achievement"
                >
                  <FiTrash className="h-7 w-7" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  // console.log(achievements);

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="student" />

      <div className="max-w-7xl mx-auto p-3 ">
        {/* Add Achievement Button */}
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-3xl font-bold text-gray-800"></h1>
          <button
            onClick={() => {
              setEditingAchievement(null);
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FiPlus className="h-5 w-5" />
            <span>Add Achievement</span>
          </button>
        </div>
        {/* Statistics Section (if applicable) */}
        <div className="flex flex-col bg-white p-8 rounded-2xl shadow-xl mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            <Stat
              label="Certificates"
              value={
                <CountUp
                  start={0}
                  end={profile.achievements?.total_number_of_certificates || 0}
                  duration={2}
                />
              }
            />
            <Stat
              label="Internships"
              value={
                <CountUp
                  start={0}
                  end={profile.achievements?.total_number_of_internships || 0}
                  duration={2}
                />
              }
            />
            <Stat
              label="Projects"
              value={
                <CountUp
                  start={0}
                  end={profile.achievements?.total_number_of_projects || 0}
                  duration={2}
                />
              }
            />
            <Stat
              label="Online Courses"
              value={
                <CountUp
                  start={0}
                  end={
                    profile.achievements?.total_number_of_online_courses || 0
                  }
                  duration={2}
                />
              }
            />
            <Stat
              label="Hackathons"
              value={
                <CountUp
                  start={0}
                  end={profile.achievements?.total_number_of_hackathons || 0}
                  duration={2}
                />
              }
            />
          </div>
          <div className="rounded-2xl mt-10">
            <AchievementCalendarContainer achievements={achievements} />
          </div>

          {/* Tab-based View */}
          <div className="bg-white p-8 rounded-2xl shadow-xl mt-10">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex space-x-2 p-1 mb-8">
                <Tabs.Trigger
                  value="achievements"
                  className="text-3xl font-bold text-gray-800 text-center"
                >
                  Achievements
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="achievements" className="space-y-10">
                {Object.keys(profile.achievements || {})
                  .filter((key) => Array.isArray(profile.achievements[key]))
                  .map((category) => renderAchievements(category))}
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
      {/* Modal for Adding an Achievement */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <AchievementForm
          initialData={editingAchievement || {}}
          onSubmit={handleCreateAchievement}
          onClose={() => setShowAddModal(false)}
        />
      </Modal>
      {/* Modal for Editing an Achievement */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <AchievementForm
          initialData={editingAchievement || {}}
          onSubmit={handleUpdateAchievement}
          onClose={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
}
export default Achievements;
