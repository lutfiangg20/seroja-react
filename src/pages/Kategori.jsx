import Layout from "../components/Layout";

const Kategori = () => {
  return (
    <Layout>
      <div className="card" style={{}}>
        <div className="card-body">
          <div className="form-group row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Nama Kategori"
                aria-describedby="emailHelp"
              />
            </div>
            <button className="btn btn-success float-end col-sm-2">
              <i className="fa-solid fa-circle-plus" /> Tambah
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="form-group col-sm-8 row mt-3 mb-0 ml-1">
              <label htmlFor="perPage">
                Show:
                <select id="perPage">
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                entries
              </label>
            </div>
            <div className="form-group col-sm-4 row justify-content-end mt-3 mb-0 pr-0">
              <div className>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Cari barang..."
                />
              </div>
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr className="text-capitalize">
                <th>no.</th>
                <th>nama kategori</th>
                <th>aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-capitalize">
                <td></td>
                <td></td>
                <td>
                  <button type="button" className="btn btn-success">
                    <i className="fa-solid fa-pen-to-square" />
                  </button>
                  <button type="button" className="btn btn-danger">
                    <i className="fa-solid fa-trash-can" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Kategori;
