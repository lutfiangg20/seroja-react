const TambahPelanggan = (props) => {
  return (
    <div className="card" style={{}}>
      <div className="card-body">
        <form onSubmit={props.handleTambah}>
          <div className="form-group row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Nama Pelanggan"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  props.setAddPelanggan(e.target.value);
                }}
                value={props.addPelanggan}
              />
            </div>
            <button
              className="btn btn-success float-end col-sm-2"
              type="submit"
            >
              <i className="fa-solid fa-circle-plus" /> Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahPelanggan;
