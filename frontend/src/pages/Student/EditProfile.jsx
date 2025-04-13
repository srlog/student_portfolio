import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import studentAPI from "../../services/student.api.service";
import { set } from "date-fns";

const EditProfile = ({ profile, onClose, onSave }) => {
  const initialProfile = {};

  const [formData, setFormData] = useState(initialProfile);
  const [loading, setLoading] = useState(true);

  // Optional: simulate loading data from an API in useEffect
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await studentAPI.getProfile();
        const data = { ...response.data.student };
        setFormData(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
      const updatedProfile = { ...formData };
      await studentAPI.updateProfile(updatedProfile);
      onSave(updatedProfile);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <img
                src={formData.profile_picture}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <input
                type="text"
                name="profile_picture"
                value={formData.profile_picture}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder="Profile Picture URL"
              />
            </div>
          </div>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Name"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-medium">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Father's Name */}
          <div className="mb-4">
            <label
              htmlFor="fathers_name"
              className="block text-gray-700 font-medium"
            >
              Father's Name
            </label>
            <input
              type="text"
              name="fathers_name"
              id="fathers_name"
              value={formData.fathers_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Father's Name"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label
              htmlFor="date_of_birth"
              className="block text-gray-700 font-medium"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              id="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Residential Address */}
          <div className="mb-4">
            <label
              htmlFor="residential_address"
              className="block text-gray-700 font-medium"
            >
              Residential Address
            </label>
            <input
              type="text"
              name="residential_address"
              id="residential_address"
              value={formData.residential_address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Residential Address"
            />
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-gray-700 font-medium">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Mobile Number"
            />
          </div>

          {/* Parent's Mobile Number */}
          <div className="mb-4">
            <label
              htmlFor="parents_mobile_no"
              className="block text-gray-700 font-medium"
            >
              Parent's Mobile Number
            </label>
            <input
              type="text"
              name="parents_mobile_no"
              id="parents_mobile_no"
              value={formData.parents_mobile_no}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Parent's Mobile Number"
            />
          </div>

          {/* Aadhar Card Number */}
          <div className="mb-4">
            <label
              htmlFor="aadhar_card_no"
              className="block text-gray-700 font-medium"
            >
              Aadhar Card Number
            </label>
            <input
              type="text"
              name="aadhar_card_no"
              id="aadhar_card_no"
              value={formData.aadhar_card_no}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Aadhar Card Number"
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-gray-700 font-medium"
            >
              Department
            </label>
            <select
              name="department"
              id="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="AI&DS">AI&DS</option>
              <option value="CSE">CSE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          {/* Year */}
          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700 font-medium">
              Year
            </label>
            <select
              name="year"
              id="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>

          {/* Section */}
          <div className="mb-4">
            <label
              htmlFor="section"
              className="block text-gray-700 font-medium"
            >
              Section
            </label>
            <input
              type="text"
              name="section"
              id="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Section"
            />
          </div>

          {/* CGPA */}
          <div className="mb-4">
            <label htmlFor="cgpa" className="block text-gray-700 font-medium">
              CGPA
            </label>
            <input
              type="number"
              name="cgpa"
              id="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="CGPA"
              step="0.1"
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700 font-medium">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Tell us something about yourself"
            ></textarea>
          </div>

          {/* Portfolio */}
          <div className="mb-4">
            <label
              htmlFor="portfolio"
              className="block text-gray-700 font-medium"
            >
              Portfolio
            </label>
            <input
              type="text"
              name="portfolio"
              id="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Portfolio"
            />
          </div>

          {/* GitHub Profile */}
          <div className="mb-4">
            <label
              htmlFor="github_profile"
              className="block text-gray-700 font-medium"
            >
              GitHub Profile
            </label>
            <input
              type="text"
              name="github_profile"
              id="github_profile"
              value={formData.github_profile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="GitHub Profile"
            />
          </div>

          {/* LinkedIn Profile */}
          <div className="mb-4">
            <label
              htmlFor="linkedin_profile"
              className="block text-gray-700 font-medium"
            >
              LinkedIn Profile
            </label>
            <input
              type="text"
              name="linkedin_profile"
              id="linkedin_profile"
              value={formData.linkedin_profile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="LinkedIn Profile"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

const ConfirmPassword = () => {
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

      await studentAPI.updatePassword(updatedProfile);
      toast.success("Password updated successfully!");
    } catch (error) {
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
export { EditProfile, ConfirmPassword };
