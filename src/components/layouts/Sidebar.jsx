import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/" className="brand-link d-flex justify-content-center">
        <img
          src="/dist/img/seroja.PNG"
          alt="AdminLTE Logo"
          className="brand-image  elevation-3"
          style={{ opacity: ".8" }}
        />
        <br />
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
            <li className="nav-item">
              <NavLink
                to="/kasir/ecer"
                className={`nav-link ${
                  location.pathname === "/kasir/ecer" &&
                  location.pathname === "/kasir/penjual"
                    ? "active"
                    : ""
                }`}
              >
                <i className="fa-solid fa-cart-shopping" />
                <p> Kasir</p>
              </NavLink>
            </li>
            {/* <li
              className={`nav-item ${
                location.pathname.startsWith("/kategori") ||
                location.pathname.startsWith("/barang")
                  ? "menu-open"
                  : ""
              }`}
            >
              <a href="#" className="nav-link">
                <i className="fa-solid fa-store" />
                <p>
                  Toko
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview ml-3">
                <li className="nav-item">
                  <NavLink
                    to="/kategori"
                    className="nav-link"
                    activeclassname="active"
                  >
                    <i className="fa-solid fa-layer-group" />
                    <p>Kategori</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/barang"
                    className="nav-link"
                    activeclassname="active"
                  >
                    <i className="fa-solid fa-box-open" />
                    <p>Barang</p>
                  </NavLink>
                </li>
              </ul>
            </li> */}
            <li className="nav-item">
              <NavLink
                to="/pelanggan"
                className="nav-link"
                activeclassname="active"
              >
                <i className="fa-solid fa-users" />
                <p> Pelanggan</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/kategori"
                className="nav-link"
                activeclassname="active"
              >
                <i className="fa-solid fa-layer-group" />
                <p> Kategori</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/barang"
                className="nav-link"
                activeclassname="active"
              >
                <i className="fa-solid fa-box-open" />
                <p> Barang</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/laporan"
                className="nav-link"
                activeclassname="active"
              >
                <i className="fa-solid fa-cart-shopping" />
                <p> Laporan</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/logout"
                className="nav-link"
                activeclassname="active"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <p> Logout</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar;
