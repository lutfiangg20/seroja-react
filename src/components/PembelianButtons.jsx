import { NavLink, useLocation } from "react-router-dom";

const PembelianButtons = (props) => {
  const location = useLocation();

  return (
    <div className="container-fluid">
      <NavLink to="/pembelian/ecer">
        <button
          type="button"
          className={`btn ${
            location.pathname === "/pembelian/ecer"
              ? "btn-success"
              : "btn-secondary"
          } mr-1`}
        >
          <i className="fa-solid fa-circle-plus" /> Transaksi Ecer
        </button>
      </NavLink>
      <NavLink to="/pembelian/penjual">
        <button
          type="button"
          className={`btn ${
            location.pathname === "/pembelian/penjual"
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
      <div className="row">
        <div className="col-md-6 mt-4">{props.barang}</div>
        <div className="col-md-6 mt-4">{props.cart}</div>
      </div>
    </div>
  );
};

export default PembelianButtons;
