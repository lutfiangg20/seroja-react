import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ExportToExcelButton from "../components/ExportToExcel";
import LaporanButtons from "../components/LaporanButtons";
import Layout from "../components/Layout";
import Cookies from "universal-cookie";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Button, Input } from "@mui/material";
/* import { invoke } from "@tauri-apps/api"; */

const AllPayment = () => {
  const [laporan, setLaporan] = useState([]);
  const [backup, setBackup] = useState([]);
  const [formDate, setformDate] = useState({
    start: Date.now(),
    end: Date.now(),
  });
  let cookie = new Cookies();

  const token = cookie.get("token");
  const getData = async () => {
    await fetch("http://localhost:3000/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLaporan(data);
        setBackup(data);
        /* data.map((item) => {
          item.cart.map((cart) => {
            setLaporan((laporan) => [...laporan, cart]);
          });
        }); */
      });

    /* invoke("get_laporan", {}).then((res) => {
      res = JSON.parse(res);
      setLaporan(res);
      res.map((item) => {
        item.cart.map((cart) => {
          setLaporan((laporan) => [...laporan, cart]);
        });
      });
    }); */
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDate = async () => {
    setLaporan(
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "pelanggan", //access nested data with dot notation
        header: "Nama Pembeli",
        size: 50,
      },
      {
        accessorKey: "nama_barang", //access nested data with dot notation
        header: "Nama Barang",
        size: 50,
      },

      {
        accessorKey: "stok",
        header: "Total_item",
        size: 50,
      },
      {
        accessorKey: "harga",
        header: "Harga",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <span>{formatter.format(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "diskon",
        header: "Diskon",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <span>{formatter.format(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "total_harga",
        header: "Total Harga",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <span>{formatter.format(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "createdAt", //access nested data with dot notation
        header: "Tanggal",

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

  const handlePemasukan = useMemo(() => {
    const totalPoints = laporan.reduce((a, b) => a + b.total_harga, 0);
    return totalPoints;
  }, [laporan]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR", // You can change this to your desired currency code
  });

  const table = useMaterialReactTable({
    columns,
    data: laporan, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowNumbers: true,
    muiTableBodyCellProps: () => ({
      sx: {
        textTransform: "capitalize",
      },
    }),
  });
  return (
    <Layout>
      <LaporanButtons />
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <h4>Total Pemasukan : {formatter.format(handlePemasukan)}</h4>
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
              <ExportToExcelButton data={laporan} fileName="Laporan" />
            </div>
          </div>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default AllPayment;
