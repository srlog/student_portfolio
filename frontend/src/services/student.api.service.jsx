import axiosInstance from '../api/axiosInstance';

const studentAPI = {
  register: (data) => axiosInstance.post('/auth/student/register', data),
  login: (data) => axiosInstance.post('/auth/student/login', data),
  updatePassword: (data) => axiosInstance.put('/auth/student/update-password', data),
  getProfile: () => axiosInstance.get('/profile/student'),
  updateProfile: (data) => axiosInstance.put('/profile/student', data),
  bulkCreate: (data) => axiosInstance.post('/student/bulk-register', data),
};

export default studentAPI;