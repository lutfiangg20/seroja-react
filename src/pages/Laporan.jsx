import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Laporan = () => {
  const [laporan, setLaporan] = useState([]);

  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const getData = async () => {
    await fetch("http://seroja.test/api/pembelian")
      .then((res) => res.json())
      .then((data) => {
        setLaporan(data);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  /* const searchData = () => {
    setLaporan(laporan.filter((item) => item.tgl_beli === search));
  }; */

  const filteredData = laporan.filter((item) =>
    item.nama_barang.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div className="card card-secondary">
        <div className="d-flex">
          <div className="form-group row mt-3 mb-0 ml-3 mr-5">
            <label htmlFor="perPage" className="d-flex">
              <div className="mt-1 px-0">Show :</div>
              <div className="mx-2 ">
                <select
                  className="form-control"
                  id="perPage"
                  onChange={(e) => {
                    setLimit(e.target.value);
                  }}
                >
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
                onChange={(e) => setSearch(e.target.value)}
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
              {filteredData.slice(0, limit).map((item, index) => (
                <tr className="text-capitalize" key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td>{item.nama_barang}</td>
                  <td>{item.total_item}</td>
                  <td>Rp. {item.total_harga}</td>
                  <td>{item.diskon}</td>
                  <td>Rp. {item.total_bayar}</td>
                  <td>{item.jenis_transaksi}</td>
                  <td>
                    <button className="btn btn-danger">
                      <i className="fa-solid fa-trash-can" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Laporan;
