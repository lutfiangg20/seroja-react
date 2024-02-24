import { Button } from "@mui/material";
import * as XLSX from "xlsx";

const ExportToExcelButton = ({ data, fileName }) => {
  /* const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }; */
  const filteredData = data.map((item, index) => ({
    no: index + 1,
    nama_barang: item.nama_barang,
    harga: item.harga,
    total_item: item.total_item,
    total_harga: item.total_harga,
    diskon: item.diskon,
    total_bayar: item.total_bayar,
    jenis_transaksi: item.jenis_transaksi,
    created_at: item.created_at,
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
