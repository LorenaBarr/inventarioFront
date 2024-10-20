import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InventoryPage from "./pages/InventoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddProductPage from "./pages/AddProductPage";
import BodegaPage from "./pages/BodegaPage";
import VentaPage from "./pages/VentaPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";
import NavInicio from "./components/NavInicio"; // Navbar para la página de inicio (no logueado)
import NavDentro from "./components/NavDentro"; // Navbar para cuando ya estás dentro (logueado)

// Componente para seleccionar el Navbar adecuado
const AppNav = () => {
  const location = useLocation();

  // Rutas en las que se mostrará el NavInicio (inicio, login, registro)
  const isInicio =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  // Si está en una de estas rutas, mostrar NavInicio, de lo contrario mostrar NavDentro
  return isInicio ? <NavInicio /> : <NavDentro />;
};

function App() {
  return (
    <Router>
      {/* Renderizamos el navbar dinámico dependiendo de la ruta */}
      <AppNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas privadas (solo accesibles para usuarios logueados) */}
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <InventoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/bodegas"
          element={
            <PrivateRoute>
              <BodegaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ventas"
          element={
            <PrivateRoute>
              <VentaPage />
            </PrivateRoute>
          }
        />

        {/* Página de error 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
