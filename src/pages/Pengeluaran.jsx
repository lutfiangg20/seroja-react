import LaporanButtons from "../components/LaporanButtons";
import Layout from "../components/Layout";

import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import Cookies from "universal-cookie";
import moment from "moment";
import TambahPengeluaran from "../components/tambahPengeluaran";
import { Button, Input } from "@mui/material";

const Pengeluaran = () => {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori: "",
    jumlah: "",
    harga: "",
    total_harga: "",
  });
  const [backup, setBackup] = useState([]);
  const [formDate, setformDate] = useState({
    start: Date.now(),
    end: Date.now(),
  });
  let cookie = new Cookies();
  const token = cookie.get("token");

  const getData = async () => {
    await fetch("http://localhost:3000/api/pengeluaran", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPengeluaran(data);
        setBackup(data);
      });
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
  };

  useEffect(() => {
    getData();
    getKategori();
  }, []);

  const handlePengeluaran = useMemo(() => {
    const totalPoints = pengeluaran.reduce((a, b) => a + b.total_harga, 0);
    return totalPoints;
  }, [pengeluaran]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "nama_barang",
        header: "nama pembeli",
        size: 50,
      },
      {
        accessorKey: "kategori",
        header: "kategori",
        size: 50,
      },
      {
        accessorKey: "harga",
        header: "harga",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <span>{formatter.format(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "jumlah",
        header: "jumlah",
        size: 50,
      },
      {
        accessorKey: "total_harga",
        header: "total_harga",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <span>{formatter.format(renderedCellValue)}</span>
        ),
      },

      {
        accessorKey: "createdAt",
        header: "tanggal",

        Cell: ({ renderedCellValue }) => (
          <span>
            {moment(renderedCellValue).format("DD-MM-YYYY, HH:mm:ss ")}
          </span>
        ),
        size: 50,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: pengeluaran, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    muiTableHeadCellProps: () => ({
      sx: {
        textTransform: "capitalize",
      },
    }),
    muiTableBodyCellProps: () => ({
      sx: {
        textTransform: "capitalize",
      },
    }),
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.total_harga = Number(formData.jumlah) * Number(formData.harga);
    console.log(formData);

    await fetch("http://localhost:3000/api/pengeluaran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    }).then(() => {
      getData();
      setFormData({
        nama_barang: "",
        kategori: "",
        harga: "",
        total_harga: "",
      });
    });
  };

  const handleDate = async () => {
    setPengeluaran(
      backup.filter((item) => {
        return (
          moment(item.createdAt).format("DD-MM-YYYY") >=
            moment(formDate.start).format("DD-MM-YYYY") &&
          moment(item.createdAt).format("DD-MM-YYYY") <=
            moment(formDate.end).format("DD-MM-YYYY")
        );
      })
    );
  };

  const handleReset = async () => {
    getData();
    setformDate({
      start: Date.now(),
      end: Date.now(),
    });
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR", // You can change this to your desired currency code
  });

  return (
    <Layout>
      <LaporanButtons />
      <TambahPengeluaran
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        formData={formData}
        setForm={setFormData}
        kategori={kategori}
      />
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <h4>Total Pengeluaran : {formatter.format(handlePengeluaran)}</h4>
            <div className="d-flex justify-content-between gap-4">
              <div className="d-flex gap-2">
                <label htmlFor="start" className="mt-2">
                  Dari
                </label>
                <Input
                  type="date"
                  id="start"
                  name="start"
                  onChange={(e) =>
                    setformDate({ ...formDate, start: e.target.value })
                  }
                  value={formDate.start}
                />
              </div>
              <div className="d-flex gap-2">
                <label htmlFor="end" className="mt-2">
                  Sampai
                </label>
                <Input
                  type="date"
                  id="end"
                  name="end"
                  onChange={(e) =>
                    setformDate({ ...formDate, end: e.target.value })
                  }
                  value={formDate.end}
                />
              </div>
              <Button variant="contained" onClick={handleDate}>
                Cari
              </Button>
              <Button variant="contained" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default Pengeluaran;
