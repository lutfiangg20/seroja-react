import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
/* import TableBarang from "../components/TableBarang"; */
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "universal-cookie";
import { Box, Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
/* import { invoke } from "@tauri-apps/api"; */

const Barang = () => {
  const [barang, setBarang] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori: "",
    stok: null,
    harga: null,
  });
  const [open, setOpen] = useState(false);
  let cookie = new Cookies();
  const token = cookie.get("token");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/barang", {
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
          stok: "",
          harga: "",
        });
      })
      .catch((err) => console.log(err));

    /*  invoke("add_barang", {
      nama_barang: formData.nama_barang,
      kategori: formData.kategori,
      stok: formData.stok,
      harga: formData.harga,
    })
      .then((res) => {
        console.log(res);
        getBarang();
        setFormData({
          nama_barang: "",
          kategori: "",
          stok: 0,
          harga: 0,
        });
      })
      .catch((err) => {
        console.log(err);
      }); */
  };

  const handleDelete = async (id) => {
    const newBarang = barang.filter((item) => item.id !== id);
    setBarang(newBarang);

    await fetch(`http://localhost:3000/api/barang/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(() => {
      getBarang();
    });

    /*  invoke("delete_barang", {
      nama_barang: nama_barang,
    })
      .then((res) => {
        console.log(res);
        getBarang();
      })
      .catch((err) => {
        console.log(err);
      }); */
  };

  const getBarang = async () => {
    await fetch("http://localhost:3000/api/barang", {
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
    /* invoke("get_barang", {}).then((res) => {
      console.log(JSON.parse(res));
      setBarang(JSON.parse(res));
    }); */
  };

  const getKategori = async () => {
    await fetch("http://localhost:3000/api/kategori", {
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
    /*  invoke("get_kategori", {}).then((res) => {
      console.log(JSON.parse(res));
      setKategori(JSON.parse(res));
    }); */
  };

  useEffect(() => {
    getBarang();
    getKategori();
  }, []);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR", // You can change this to your desired currency code
  });

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
        //format rupiah
        Cell: ({ renderedCellValue }) => (
          <span>{formatter.format(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "id",
        header: "Action",
        Cell: ({ cell }) => (
          <span className="d-flex gap-2">
            <div className="">
              <Tooltip title="Hapus" placement="top">
                <button
                  className="btn btn-danger "
                  onClick={() => {
                    handleDelete(cell.row.original.id);
                  }}
                >
                  <GridDeleteIcon />
                </button>
              </Tooltip>
            </div>
            <div className="">
              <Tooltip title="Edit" placement="top">
                <button
                  className="btn btn-warning "
                  onClick={() => {
                    setEditBarang({
                      id: cell.row.original.id,
                      nama_barang: cell.row.original.nama_barang,
                      kategori: cell.row.original.kategori,
                      stok: cell.row.original.stok,
                      harga: cell.row.original.harga,
                    });
                    handleOpen();
                  }}
                >
                  <EditIcon />
                </button>
              </Tooltip>
            </div>
          </span>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: barang, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    muiTableBodyCellProps: () => ({
      sx: {
        textTransform: "capitalize",
      },
    }),
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editBarang, setEditBarang] = useState({
    _id: "",
    nama_barang: "",
    kategori: "",
    stok: 0,
    harga: 0,
  });

  const handleInputUpdate = (e) => {
    setEditBarang({ ...editBarang, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/api/barang/${editBarang.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(editBarang),
    })
      .then(() => {
        getBarang();
        handleClose();
      })
      .catch((err) => console.log(err));

    /* invoke("update_barang", {
      nama_barang: editBarang.nama_barang,
      kategori: editBarang.kategori,
      stok: editBarang.stok,
      harga: editBarang.harga,
    })
      .then((res) => {
        console.log(res);
        getBarang();
        handleClose();
      })
      .catch((err) => console.log(err)); */
  };

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
                    required
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
                    required
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
                    type="text"
                    className="form-control"
                    id="stok"
                    name="stok"
                    placeholder="Stok"
                    accept="number"
                    onChange={handleInput}
                    value={formData.stok}
                    required
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
                    required
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card" style={{}}>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="form-group row">
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Barang"
                      id="nama_barang"
                      name="nama_barang"
                      aria-describedby="emailHelp"
                      onChange={handleInputUpdate}
                      value={editBarang.nama_barang}
                    />
                  </div>
                  <div className="col-sm-2">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      placeholder="Kategori"
                      id="kategori"
                      name="kategori"
                      onChange={handleInputUpdate}
                      value={editBarang.kategori}
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
                      onChange={handleInputUpdate}
                      value={editBarang.stok}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="number"
                      className="form-control"
                      id="harga"
                      name="harga"
                      placeholder="Harga"
                      onChange={handleInputUpdate}
                      value={editBarang.harga}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success float-end col-sm-2"
                  >
                    <EditIcon /> Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </Layout>
  );
};

export default Barang;
