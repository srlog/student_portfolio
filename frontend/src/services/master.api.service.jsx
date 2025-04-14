
import axiosInstance from '../api/axiosInstance';

const masterAPI = {
  register: (data) => axiosInstance.post('/auth/master/register', data),
  login: (data) => axiosInstance.post('/auth/master/login', data),
  updatePassword: (data) => axiosInstance.put('/auth/master/update-password', data),
  getProfile: () => axiosInstance.get('/profile/master'),
  getAnalytics: () => axiosInstance.get('/master/analytics'),
  getReports: () => axiosInstance.get('/master/reports'),
};

export default masterAPI;