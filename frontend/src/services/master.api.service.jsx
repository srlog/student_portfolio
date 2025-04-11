import axiosInstance from '../api/axiosInstance';

const masterAPI = {
  register: (data) => axiosInstance.post('/master/register', data),
  login: (data) => axiosInstance.post('/master/login', data),
  updatePassword: (data) => axiosInstance.put('/master/update-password', data),
  getDashboardData: () => axiosInstance.get('/master/dashboard'),
  getAnalytics: () => axiosInstance.get('/master/analytics'),
  getReports: () => axiosInstance.get('/master/reports'),
};

export default masterAPI;