import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import Cookies from "universal-cookie";
import LaporanButtons from "../components/LaporanButtons";
/* import { invoke } from "@tauri-apps/api"; */
import moment from "moment";

const Laporan = () => {
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
        setLaporan(data);
        console.log(data);
      });
    /* invoke("get_laporan", {}).then((res) => {
      res = JSON.parse(res);
      setLaporan(res);
    }); */
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
          <MaterialReactTable table={table} />
        </div>
      </div>
    </Layout>
  );
};

export default Laporan;
