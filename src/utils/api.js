import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = (url) => api.get(url);

export const post = (url, data) => api.post(url, data);

export const put = (url, data) => api.put(url, data);

export const del = (url) => api.delete(url);

export default api;
