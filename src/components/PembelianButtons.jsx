import { NavLink, useLocation } from "react-router-dom";

const PembelianButtons = (props) => {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <NavLink to="/kasir/ecer">
        <button
          type="button"
          className={`btn ${
            location.pathname === "/kasir/ecer"
              ? "btn-success"
              : "btn-secondary"
          } mr-1`}
        >
          <i className="fa-solid fa-circle-plus" /> Transaksi Ecer
        </button>
      </NavLink>
      <NavLink to="/kasir/penjual">
        <button
          type="button"
          className={`btn ${
            location.pathname === "/kasir/penjual"
              ? "btn-success"
              : "btn-secondary"
          } mx-1`}
        >
          <i className="fa-solid fa-circle-plus" /> Transaksi Penjual
        </button>
      </NavLink>
      {/*  <button type="button" className="btn btn-danger mx-1">
        <i className="fa-solid fa-circle-plus" /> Transaksi Bengkel
      </button> */}
      <div className="mb-5">{props.barang}</div>
      <div>{props.cart}</div>
    </div>
  );
};

export default PembelianButtons;
