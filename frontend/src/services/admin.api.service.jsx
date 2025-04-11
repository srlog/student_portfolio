import axiosInstance from '../api/axiosInstance';

const adminAPI = {
  register: (data) => axiosInstance.post('/admin/register', data),
  login: (data) => axiosInstance.post('/admin/login', data),
  updatePassword: (data) => axiosInstance.put('/admin/update-password', data),
  getProfile: () => axiosInstance.get('/profile/admin'),
  updateProfile: (data) => axiosInstance.put('/profile/admin', data),
  getStudents: () => axiosInstance.get('/admin/students'),
  getStudentDetails: (id) => axiosInstance.get(`/admin/students/${id}`),
};

export default adminAPI;