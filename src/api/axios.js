import axios from "axios";

const api = axios.create({
  // baseURL: "http://django_backend:8000/api", // docker!!!
  baseURL: "/api", // producción o proxy
});

api.interceptors.request.use((config) => {
  // No enviar token en rutas públicas como /proveedor/
  if (!config.url.includes('/proveedor/')) {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
