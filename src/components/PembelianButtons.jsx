const PembelianButtons = (props) => {
  return (
    <div className="container-fluid">
      <button type="button" className="btn btn-primary mr-1">
        <i className="fa-solid fa-circle-plus" /> Transaksi Ecer
      </button>
      <button type="button" className="btn btn-success mx-1">
        <i className="fa-solid fa-circle-plus" /> Transaksi Penjual
      </button>
      <button type="button" className="btn btn-danger mx-1">
        <i className="fa-solid fa-circle-plus" /> Transaksi Bengkel
      </button>
      <div className="row">
        <div className="">{props.barang}</div>
        <div className="">{props.cart}</div>
      </div>
    </div>
  );
};

export default PembelianButtons;
