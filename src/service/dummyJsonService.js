import api from "../utils/api";

export const dummyJsonService = {
  getUsers: () => api.get("/users"),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (user) => api.post("/users/add", user),
  deleteUser: (id) => api.delete(`/users/${id}`),
  updateUser: (id, user) => api.put(`/users/${id}`, user),
};
