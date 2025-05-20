import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// GET isteği
export const get = (url) => api.get(url);

// POST isteği
export const post = (url, data) => api.post(url, data);

// PUT isteği
export const put = (url, data) => api.put(url, data);

// DELETE isteği
export const del = (url) => api.delete(url);

export default api;
