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

const AllPayment = () => {
  const [laporan, setLaporan] = useState([]);
  let cookie = new Cookies();
  const token = cookie.get("token");
  const getData = async () => {
    await fetch("http://localhost:3000/laporan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.map((item) => {
          item.cart.map((cart) => {
            setLaporan((laporan) => [...laporan, cart]);
          });
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "jenis", //access nested data with dot notation
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
        accessorKey: "created_at", //access nested data with dot notation
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
          <div className="d-flex justify-content-end mb-3">
            <ExportToExcelButton data={laporan} fileName="Laporan" />
          </div>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default AllPayment;
