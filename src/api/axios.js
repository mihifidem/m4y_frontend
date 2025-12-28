import axios from "axios";

const api = axios.create({
  // baseURL: "http://django_backend:8000/api", // docker!!!
  baseURL: "/api", // producción o proxy
});

api.interceptors.request.use((config) => {
  // No enviar token solo en /proveedor/:prefix/ (GET público)
  const isPublicProveedor =
    config.method === 'get' &&
    /^\/proveedor\/[A-Z]{4}\/?$/.test(config.url);

  if (!isPublicProveedor) {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
