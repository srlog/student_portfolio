import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import masterAPI from '../../services/master.api.service';
import Navbar from '../../components/Layout/Navbar';

function Analytics() {
  const [analytics, setAnalytics] = useState({
    departmentWise: [],
    yearWise: [],
    achievementTypes: [],
    monthlyTrends: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await masterAPI.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar role="master" />
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar role="master" />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Department-wise Statistics</h2>
            <div className="space-y-4">
              {analytics.departmentWise.map((dept) => (
                <div key={dept.id} className="flex justify-between items-center">
                  <span className="text-gray-600">{dept.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-primary-600">{dept.studentCount} students</span>
                    <span className="text-green-600">{dept.achievementCount} achievements</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Year-wise Distribution</h2>
            <div className="space-y-4">
              {analytics.yearWise.map((year) => (
                <div key={year.year} className="flex justify-between items-center">
                  <span className="text-gray-600">Year {year.year}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-primary-600">{year.studentCount} students</span>
                    <span className="text-green-600">{year.achievementCount} achievements</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Achievement Types</h2>
            <div className="space-y-4">
              {analytics.achievementTypes.map((type) => (
                <div key={type.name} className="flex justify-between items-center">
                  <span className="text-gray-600">{type.name}</span>
                  <span className="text-primary-600">{type.count} achievements</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Monthly Trends</h2>
            <div className="space-y-4">
              {analytics.monthlyTrends.map((month) => (
                <div key={month.month} className="flex justify-between items-center">
                  <span className="text-gray-600">{month.month}</span>
                  <span className="text-primary-600">{month.achievementCount} achievements</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;