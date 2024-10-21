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
import ProductPage from "./pages/ProductPage"; 
import AddProductPage from "./pages/AddProductPage";
import BodegaPage from "./pages/BodegaPage";
import VentaPage from "./pages/VentaPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";
import NavInicio from "./components/NavInicio";
import NavDentro from "./components/NavDentro";

// Componente para seleccionar el Navbar adecuado
const AppNav = () => {
  const location = useLocation();
  const isInicio =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return isInicio ? <NavInicio /> : <NavDentro />;
};

function App() {
  return (
    <Router>
      <AppNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas privadas */}
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <InventoryPage />
            </PrivateRoute>
          }
        />

        {/* Ruta para agregar producto */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProductPage />
            </PrivateRoute>
          }
        />

        {/* Ruta para ver productos */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductPage />
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
