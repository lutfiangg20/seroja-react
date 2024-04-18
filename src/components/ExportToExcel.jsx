import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import moment from "moment";

const ExportToExcelButton = ({ data, fileName }) => {
  /* const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }; */
  const filteredData = data.map((item, index) => ({
    no: index + 1,
    Pelanggan: item.pelanggan,
    "Nama Barang": item.nama_barang,
    Harga: item.harga,
    "Total Item": item.stok,
    "Total Harga": item.total_harga,
    Diskon: item.diskon,
    /*  "Total Bayar": item.total_bayar, */
    "Jenis Transaksi": item.jenis,
    Tanggal: moment(item.createdAt).format("DD-MM-YYYY, HH:mm:ss "),
  }));
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Button variant="contained" color="primary" onClick={exportToExcel}>
      Export
    </Button>
  );
};

export default ExportToExcelButton;
