import api from "../utils/api";

export const dummyJsonService = {
  getUsers: () => api.get("/users"),
};
