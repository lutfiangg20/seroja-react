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
import { invoke } from "@tauri-apps/api";

const AllPayment = () => {
  const [laporan, setLaporan] = useState([]);
  let cookie = new Cookies();
  const token = cookie.get("token");
  const getData = async () => {
    await fetch("http://localhost:3000/api/laporan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLaporan([]);
        data.map((item) => {
          item.cart.map((cart) => {
            setLaporan((laporan) => [...laporan, cart]);
          });
        });
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

  useEffect(() => {
    setTotalPemasukan(laporan.reduce((a, b) => a + b.total_harga, 0));
  }, [laporan]);

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
      },
      {
        accessorKey: "diskon",
        header: "Diskon",
        size: 50,
      },
      {
        accessorKey: "total_harga",
        header: "Total Harga",
        size: 50,
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
      /* {
        accessorKey: "total_bayar",
        header: "Total Bayar",
        size: 50,
      }, */
      /*  {
        accessorKey: "jenis",
        header: "Jenis Transaksi",
        size: 50,
      }, */
    ],
    []
  );

  const [totalPemasukan, setTotalPemasukan] = useState(0);
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
            <h4>Total Pemasukan : {formatter.format(totalPemasukan)}</h4>
            <ExportToExcelButton data={laporan} fileName="Laporan" />
          </div>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default AllPayment;
