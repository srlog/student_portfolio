import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import achievementAPI from '../../services/achievement.api.service';
import Navbar from '../../components/Layout/Navbar';

function AchievementForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    type: '',
    proof: null,
  });

  useEffect(() => {
    if (id) {
      loadAchievement();
    }
  }, [id]);

  const loadAchievement = async () => {
    try {
      const response = await achievementAPI.getById(id);
      setFormData({
        ...response.data,
        proof: null,
      });
    } catch (error) {
      toast.error('Failed to load achievement');
      navigate('/student/achievements');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (id) {
        await achievementAPI.update(id, formDataToSend);
        toast.success('Achievement updated successfully');
      } else {
        await achievementAPI.create(formDataToSend);
        toast.success('Achievement created successfully');
      }
      navigate('/student/achievements');
    } catch (error) {
      toast.error(id ? 'Failed to update achievement' : 'Failed to create achievement');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="student" />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {id ? 'Edit Achievement' : 'Add Achievement'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700">Title</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="text-gray-700">Description</label>
            <textarea
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="text-gray-700">Date</label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <div>
            <label className="text-gray-700">Type</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="">Select Type</option>
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="cultural">Cultural</option>
              <option value="technical">Technical</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-gray-700">Proof Document</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={(e) => setFormData({...formData, proof: e.target.files[0]})}
            />
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: PDF, JPG, JPEG, PNG
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-primary-500 text-white py-2 px-6 rounded-md hover:bg-primary-600 transition duration-200"
            >
              {id ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/achievements')}
              className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AchievementForm;