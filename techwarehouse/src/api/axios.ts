import axios from 'axios';

// Crear una instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL del backend de Django
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejar el error antes de enviar la solicitud
    return Promise.reject(error);
  }
);

export default api;
