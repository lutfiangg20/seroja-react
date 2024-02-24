import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
/* import TableBarang from "../components/TableBarang"; */
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { GridDeleteIcon } from "@mui/x-data-grid";
import Cookies from "universal-cookie";

const Barang = () => {
  const [barang, setBarang] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori: "",
    stok: 0,
    harga: "",
  });
  let cookie = new Cookies();
  const token = cookie.get("token");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/barang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        getBarang();
        setFormData({
          nama_barang: "",
          kategori: "",
          stok: 0,
          harga: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (nama_barang) => {
    /*  const newBarang = barang.filter((item) => item.id !== id);
    setBarang(newBarang); */

    await fetch(`http://localhost:3000/barang/${nama_barang}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(() => {
      getBarang();
    });
  };

  const getBarang = async () => {
    await fetch("http://localhost:3000/barang", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBarang(data);
      });
  };

  const getKategori = async () => {
    await fetch("http://localhost:3000/kategori", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setKategori(data);
      });
  };

  useEffect(() => {
    getBarang();
    getKategori();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "nama_barang",
        header: "Nama Barang",
      },
      {
        accessorKey: "kategori",
        header: "kategori",
      },
      {
        accessorKey: "stok",
        header: "Stok",
      },
      {
        accessorKey: "harga",
        header: "Harga",
      },
      {
        accessorKey: "_id",
        header: "Action",
        Cell: () => (
          <button className="btn btn-danger">
            <GridDeleteIcon />
          </button>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: barang, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    muiTableBodyCellProps: ({ cell }) => ({
      onClick: () => {
        handleDelete(cell.row.original.nama_barang);
      },
    }),
  });

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
                    id="stok"
                    name="stok"
                    placeholder="Stok"
                    onChange={handleInput}
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
          <MaterialReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default Barang;
