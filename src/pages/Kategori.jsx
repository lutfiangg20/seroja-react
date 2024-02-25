import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import TambahKategori from "../components/TambahKategori";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { GridDeleteIcon } from "@mui/x-data-grid";
import Cookies from "universal-cookie";

const Kategori = () => {
  const [kategori, setKategori] = useState([]);
  const [addkategori, setAddKategori] = useState("");
  let cookie = new Cookies();
  const token = cookie.get("token");

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
    getKategori();
  }, []);

  const handleTambah = async (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/kategori", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ nama_kategori: addkategori }),
    })
      .then(() => {
        getKategori();
        setAddKategori("");
      })
      .catch((err) => console.log(err));
    /* const data = {
      nama_kategori: addkategori,
    };
    const db = "seroja"; // Nama database MongoDB
    const collection = "kategori"; // Nama koleksi MongoDB */

    /* await invoke("add_data", { data: JSON.stringify(data) }).then((res) => {
      console.log(res);
    }); */
    /* try {
      await invoke("add_data", {
        db,
        collection,
        data: JSON.stringify(data),
      });
      console.log("Data successfully added to MongoDB");
    } catch (error) {
      console.error("Failed to add data to MongoDB:", error);
    } */
  };

  const handleDelete = (nama) => {
    fetch(`http://localhost:3000/kategori/${nama}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(() => {
        getKategori();
      })
      .catch((err) => console.log(err));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "nama_kategori",
        header: "Nama Kategori",
        maxSize: 10,
      },

      {
        accessorKey: "_id",
        header: "Action",
        Cell: ({ cell }) => (
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(cell.row.original.nama_kategori)}
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
    data: kategori, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    muiTableBodyCellProps: () => ({
      /* onClick: () => {
        handleDelete(cell.row.original.nama_kategori);
      }, */
      sx: {
        textTransform: "capitalize",
      },
    }),
  });

  return (
    <Layout>
      <TambahKategori
        handleTambah={handleTambah}
        setAddKategori={setAddKategori}
        addkategori={addkategori}
      />
      <div className="card">
        <div className="card-body">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default Kategori;
