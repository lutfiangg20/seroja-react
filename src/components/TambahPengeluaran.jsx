const TambahPengeluaran = ({
  handleInput,
  formData,
  handleSubmit,
  kategori,
}) => {
  return (
    <div className="card" style={{}}>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                placeholder="Nama Barang"
                id="nama_barang"
                name="nama_barang"
                aria-describedby="emailHelp"
                onChange={handleInput}
                value={formData.nama_barang}
              />
            </div>
            <div className="col-sm-2">
              <select
                className="form-select"
                aria-label="Default select example"
                placeholder="Kategori"
                id="kategori"
                name="kategori"
                onChange={handleInput}
                value={formData.kategori}
                /*  key={formData.kategori} */
              >
                <option value="" disabled selected>
                  Pilih Kategori
                </option>
                {kategori.map((item) => (
                  <option key={item.id} className="text-capitalize">
                    {item.nama_kategori}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-2">
              <input
                type="number"
                className="form-control"
                id="jumlah"
                name="jumlah"
                placeholder="Jumlah"
                onChange={handleInput}
                value={formData.jumlah}
              />
            </div>
            <div className="col-sm-2">
              <input
                type="number"
                className="form-control"
                id="harga"
                name="harga"
                placeholder="Harga"
                onChange={handleInput}
                value={formData.harga}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success float-end col-sm-2"
            >
              <i className="fa-solid fa-circle-plus" /> Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahPengeluaran;
