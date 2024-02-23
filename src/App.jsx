import {
  BrowserRouter as Router,
  Routes,
  Route,
  /*  Navigate,
  useLocation, */
} from "react-router-dom";
import About from "./pages/About.jsx";
import NoPage from "./pages/NoPage.jsx";
import Pembelian from "./pages/Pembelian.jsx";
import Laporan from "./pages/Laporan.jsx";
import Ecer from "./pages/Ecer.jsx";
import Barang from "./pages/Barang.jsx";
import Kategori from "./pages/Kategori.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Logout from "./pages/Logout.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";
import Penjual from "./pages/Penjual.jsx";
import Pelanggan from "./pages/Pelanggan.jsx";
import Invoice from "./pages/Invoice.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Ecer />
              </RequireAuth>
            }
          />
          <Route
            path="/pembelian"
            element={
              <RequireAuth>
                <Pembelian />
              </RequireAuth>
            }
          />
          <Route
            path="/kasir/ecer"
            element={
              <RequireAuth>
                <Ecer />
              </RequireAuth>
            }
          />
          <Route
            path="/kasir/penjual"
            element={
              <RequireAuth>
                <Penjual />
              </RequireAuth>
            }
          />

          <Route path="/laporan" element={<Laporan />} />

          <Route
            path="/pelanggan"
            element={
              <RequireAuth>
                <Pelanggan />
              </RequireAuth>
            }
          />
          <Route
            path="/barang"
            element={
              <RequireAuth>
                <Barang />
              </RequireAuth>
            }
          />
          <Route
            path="/kategori"
            element={
              <RequireAuth>
                <Kategori />
              </RequireAuth>
            }
          />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
