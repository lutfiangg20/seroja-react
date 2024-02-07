import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TambahKategori from "../components/TambahKategori";

const Kategori = () => {
  const [kategori, setKategori] = useState([]);
  const [addkategori, setAddKategori] = useState("");

  const getKategori = async () => {
    await fetch("http://localhost:3000/kategori")
      .then((res) => res.json())
      .then((data) => {
        setKategori(data);
      });
  };

  useEffect(() => {
    getKategori();
  }, []);

  const handleTambah = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/kategori", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama_kategori: addkategori }),
    })
      .then(() => {
        getKategori();
        setAddKategori("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (nama) => {
    fetch(`http://localhost:3000/kategori/${nama}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getKategori();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <TambahKategori
        handleTambah={handleTambah}
        setAddKategori={setAddKategori}
      />
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
              {kategori.map((item, index) => (
                <tr className="text-capitalize" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nama_kategori}</td>
                  <td>
                    <button type="button" className="btn btn-success">
                      <i className="fa-solid fa-pen-to-square" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.nama_kategori)}
                    >
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

export default Kategori;
