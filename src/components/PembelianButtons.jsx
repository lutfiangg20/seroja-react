const PembelianButtons = (props) => {
  return (
    <div className="container-fluid">
      <button type="button" className="btn btn-primary">
        <i className="fa-solid fa-circle-plus" /> Transaksi Ecer
      </button>
      <button type="button" className="btn btn-success">
        <i className="fa-solid fa-circle-plus" /> Transaksi Penjual
      </button>
      <button type="button" className="btn btn-danger">
        <i className="fa-solid fa-circle-plus" /> Transaksi Bengkel
      </button>
      <div className="row">
        <div className="col-sm-4 mt-4">{props.barang}</div>
        <div className="col-sm-8 mt-4">{props.cart}</div>
      </div>
    </div>
  );
};

export default PembelianButtons;
