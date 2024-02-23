import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import ExportToExcelButton from "../components/ExportToExcel";

const Laporan = () => {
  const [laporan, setLaporan] = useState([]);
  const token = localStorage.getItem("token");

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
        setLaporan(data);
        console.log(data);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "pelanggan", //access nested data with dot notation
        header: "Nama Pembeli",
        size: 50,
      },
      {
        accessorKey: "created_at", //access nested data with dot notation
        header: "Tanggal",

        Cell: ({ renderedCellValue }) => (
          <span>{formatDate(renderedCellValue)}</span>
        ),
        size: 50,
      },
      /* {
        accessorKey: "qty",
        header: "Total_item",
        size: 50,
      },
      {
        accessorKey: "harga",
        header: "Harga",
        size: 50,
      },
      {
        accessorKey: "total_harga",
        header: "Total Harga",
        size: 50,
      },
      {
        accessorKey: "diskon",
        header: "Diskon",
        size: 50,
      },
      {
        accessorKey: "total_bayar",
        header: "Total Bayar",
        size: 50,
      },
      {
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
  });
  return (
    <Layout>
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

export default Laporan;
