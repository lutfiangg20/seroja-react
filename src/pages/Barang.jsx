import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableBarang from "../components/TableBarang";

const Barang = () => {
  const [barang, setBarang] = useState([]);

  const getData = async () => {
    await fetch("http://seroja.test/api/barang")
      .then((res) => res.json())
      .then((data) => {
        setBarang(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div>
        <div className="card" style={{}}>
          <div className="card-body">
            <div className="form-group row">
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Barang"
                  id="nama_barang"
                  name="nama_barang"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="col-sm-2">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  placeholder="Kategori"
                  id="kategori"
                  name="kategori"
                >
                  <option value>Pilih Kategori</option>

                  <option value="{{$kategori->nama_kategori}}"></option>
                </select>
              </div>
              <div className="col-sm-2">
                <input
                  type="number"
                  className="form-control"
                  id="stok"
                  name="stok"
                  placeholder="Stok"
                />
              </div>
              <div className="col-sm-2">
                <input
                  type="number"
                  className="form-control"
                  id="harga"
                  name="harga"
                  placeholder="Harga"
                />
              </div>
              <button className="btn btn-success float-end col-sm-2">
                <i className="fa-solid fa-circle-plus" /> Tambah
              </button>
            </div>
          </div>
        </div>
        <div className="card" style={{}}>
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

            <TableBarang barang={barang} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Barang;
