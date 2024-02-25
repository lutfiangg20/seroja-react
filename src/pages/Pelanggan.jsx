import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Layout from "../components/Layout";
import TambahPelanggan from "../components/TambahPelanggan";
import { useEffect, useMemo, useState } from "react";
import { GridDeleteIcon } from "@mui/x-data-grid";
import Cookies from "universal-cookie";

const Pelanggan = () => {
  const [pelanggan, setPelanggan] = useState([]);
  const [addPelanggan, setAddPelanggan] = useState("");
  let cookie = new Cookies();
  const token = cookie.get("token");

  const getPelanggan = async () => {
    await fetch("http://localhost:3000/pelanggan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPelanggan(data);
      });
  };

  useEffect(() => {
    getPelanggan();
  }, []);

  const handleTambah = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/pelanggan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ nama: addPelanggan }),
    })
      .then(() => {
        getPelanggan();
        setAddPelanggan("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (nama) => {
    fetch(`http://localhost:3000/pelanggan/${nama}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(() => {
        getPelanggan();
      })
      .catch((err) => console.log(err));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "nama",
        header: "Nama Pelanggan",
        maxSize: 10,
      },

      {
        accessorKey: "_id",
        header: "Action",
        Cell: (cell) => (
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(cell.row.original.nama)}
          >
            <GridDeleteIcon />
          </button>
        ),
        maxSize: 2,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: pelanggan, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    muiTableBodyCellProps: () => ({
      sx: {
        textTransform: "capitalize",
      },
    }),
  });
  return (
    <Layout>
      <TambahPelanggan
        handleTambah={handleTambah}
        setAddPelanggan={setAddPelanggan}
        addPelanggan={addPelanggan}
      />
      <div className="card">
        <div className="card-body">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default Pelanggan;
