import { Link, Route, Routes, useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import PostDetailPage from "./pages/PostDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import AdminRoute from "./components/AdminRoute";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";

function App() {
  const { pathname } = useLocation();

  const usesDarkLayout =
    pathname === "/" ||
    pathname === "/productos" ||
    pathname === "/login" ||
    pathname === "/registro" ||
    pathname === "/mi-perfil" ||
    pathname === "/publicaciones/nueva" ||
    pathname === "/terminos" ||
    pathname === "/privacidad" ||
    /^\/publicaciones\/[^/]+\/editar\/?$/.test(pathname) ||
    /^\/productos\/[^/]+\/?$/.test(pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />

      <Navbar />

      <main
        className={
          usesDarkLayout
            ? "flex-grow-1 tw:min-w-0 tw:bg-funcode-bg"
            : "container py-5 flex-grow-1"
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/productos" element={<ProductsPage />} />

          <Route path="/productos/:id" element={<PostDetailPage />} />

          <Route path="/registro" element={<RegisterPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/mi-perfil" element={<ProfilePage />} />

            <Route element={<AdminRoute />}>
              <Route path="/publicaciones/nueva" element={<CreatePostPage />} />

              <Route
                path="/publicaciones/:id/editar"
                element={<EditPostPage />}
              />
            </Route>
          </Route>

          <Route path="/terminos" element={<Terminos />} />

          <Route path="/privacidad" element={<Privacidad />} />

          <Route
            path="*"
            element={
              <section>
                <h1>Página no encontrada</h1>
                <Link to="/">Volver al inicio</Link>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
