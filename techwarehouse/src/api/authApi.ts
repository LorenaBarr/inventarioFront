import api from './axios';  // Importa la configuración de Axios desde el fichero axios

// Función para iniciar sesión
export const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await api.post('/token/', credentials);
    localStorage.setItem('token', response.data.access);
    return response.data;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
};

// Función para registrar un usuario
export const register = async (userData: { username: string; email: string; password: string }) => {
  try {
    const response = await api.post('/register/', userData);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};
