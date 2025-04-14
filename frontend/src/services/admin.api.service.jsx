import axiosInstance from "../api/axiosInstance";

const adminAPI = {
  register: (data) => axiosInstance.post("/auth/admin/register", data),
  login: (data) => axiosInstance.post("/auth/admin/login", data),
  updatePassword: (data) =>
    axiosInstance.put("/auth/admin/update-password", data),
  getProfile: () => axiosInstance.get("/profile/admin"),

  updateProfilex: (data) => axiosInstance.put("/profile/admin", data),
  getStudentProfile: (id) => axiosInstance.get(`/profile/admin/student/${id}`),
};

export default adminAPI;
