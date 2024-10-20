import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token"); // Verificar si el token JWT existe en localStorage

  // Si no hay token, redirigir al usuario a la página de login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
