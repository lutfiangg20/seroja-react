import { NavLink } from "react-router-dom";

const LaporanButtons = (props) => {
  return (
    <div className="container-fluid">
      <NavLink to="/laporan">
        <button
          type="button"
          className={`btn ${
            location.pathname === "/laporan" ? "btn-success" : "btn-secondary"
          } mr-1`}
        >
          <i className="fa-solid fa-circle-plus" /> Invoice
        </button>
      </NavLink>
      <NavLink to="/semua-laporan">
        <button
          type="button"
          className={`btn ${
            location.pathname === "/semua-laporan"
              ? "btn-success"
              : "btn-secondary"
          } mx-1`}
        >
          <i className="fa-solid fa-circle-plus" /> Semua Penjualan
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

export default LaporanButtons;
