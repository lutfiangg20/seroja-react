import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TableBarang from "../components/TableBarang";

const Barang = () => {
  const [barang, setBarang] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori: "",
    stok: "",
    harga: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(e.target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3001/api/barang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    getBarang();
    setFormData({
      nama_barang: "",
      kategori: "",
      stok: "",
      harga: "",
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/api/barang/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getBarang();
    });
  };

  const getBarang = async () => {
    await fetch("http://localhost:3001/api/barang")
      .then((res) => res.json())
      .then((data) => {
        setBarang(data);
      });
  };

  const getKategori = async () => {
    await fetch("http://seroja.test/api/kategori")
      .then((res) => res.json())
      .then((data) => {
        setKategori(data);
      });
  };

  useEffect(() => {
    getBarang();
    getKategori();
  }, []);

  return (
    <Layout>
      <div>
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
                    id="stok"
                    name="stok"
                    placeholder="Stok"
                    onChange={handleInput}
                    value={formData.stok}
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

            <TableBarang barang={barang} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Barang;
