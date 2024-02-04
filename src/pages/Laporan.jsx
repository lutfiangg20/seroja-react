import Layout from "../components/Layout";

const Laporan = () => {
  return (
    <Layout>
      <div className="card card-secondary">
        <div className="d-flex">
          <div className="form-group row mt-3 mb-0 ml-3 mr-5">
            <label htmlFor="perPage" className="d-flex">
              <div className="mt-1 px-0">Show :</div>
              <div className="mx-2 ">
                <select className="form-control" id="perPage">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
              <div className="mt-1 px-0">entries</div>
            </label>
          </div>
          <div className="d-flex mt-3 ml-3">
            <label className="mx-2 mt-1" htmlFor="start_date">
              Range Tanggal:
            </label>
            <div className="mx-2">
              <input type="date" className="form-control" id="start_date" />
            </div>
            <div className="mx-2 text-center mt-1">Ke</div>
            <div className="mx-2">
              <input type="date" className="form-control" id="end_date" />
            </div>
          </div>
          <div className="mt-3 mb-0 mx-1 ml-5">
            <div className=" text-right" style={{}}>
              <input
                className="form-control"
                type="text"
                placeholder="Cari barang..."
              />
            </div>
          </div>
          <div className="text-right mb-2 mt-3 mr-3 ms-auto">
            <button
              type="button"
              id="btnExportToko"
              className="btn btn-success"
            >
              <i className="fa-solid fa-file-export" /> Export
            </button>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr className="text-capitalize">
                <th>no.</th>
                <th>tanggal</th>
                <th>nama barang</th>
                <th>total item</th>
                <th>total harga</th>
                <th>diskon</th>
                <th>total bayar</th>
                <th>jenis transaksi</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr className="text-capitalize">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Rp.</td>
                <td></td>
                <td>Rp.</td>
                <td></td>
                <td>
                  <button className="btn btn-danger">
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

export default Laporan;
