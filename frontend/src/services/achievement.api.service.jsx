import axiosInstance from '../api/axiosInstance';

const achievementAPI = {
  create: (data) => axiosInstance.post('/achievement/create', data),
  update: (id, data) => axiosInstance.put(`/achievement/update/${id}`, data),
  delete: (id) => axiosInstance.delete(`/achievement/delete/${id}`),
  approve: (id, data) => axiosInstance.patch(`/achievement/approve/${id}`, data),
  getById: (id) => axiosInstance.get(`/achievement/get/${id}`),
  getByStudentId: () => axiosInstance.get('/profile/student'),
  getByDepartment: (department) => axiosInstance.get(`/achievement/get/department/${department}`),
  getByYear: (year) => axiosInstance.get(`/achievement/get/year/${year}`),
  getByClass: (department, year) => axiosInstance.get(`/achievement/get/class/${department}/${year}`),
  getAll: () => axiosInstance.get('/achievement/getAll'),
};

export default achievementAPI;