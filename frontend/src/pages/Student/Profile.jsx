import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import studentAPI from '../../services/student.api.service';
import Navbar from '../../components/Layout/Navbar';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    rollNumber: '',
    phone: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await studentAPI.getProfile();
      setProfile(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.updateProfile(profile);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="student" />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={profile.email}
                disabled
              />
            </div>
            <div>
              <label className="text-gray-700">Department</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={profile.department}
                onChange={(e) => setProfile({...profile, department: e.target.value})}
              />
            </div>
            <div>
              <label className="text-gray-700">Year</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={profile.year}
                onChange={(e) => setProfile({...profile, year: e.target.value})}
              >
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700">Roll Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={profile.rollNumber}
                onChange={(e) => setProfile({...profile, rollNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="text-gray-700">Phone</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-primary-500 text-white py-2 px-6 rounded-md hover:bg-primary-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;