import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";

const Invoice = () => {
  const invoice = JSON.parse(localStorage.getItem("invoice"));

  useEffect(() => {
    window.print();
    //redirect back()
    window.history.back();
  }, []);

  return (
    <>
      {/* <div className="d-flex justify-content-center">
        <div>
          <table>
            <thead>
              <tr>
                <th width={140}>Nama Pembeli :</th>
                <th>Umum</th>
              </tr>
              <tr>
                <th width={120}>Nama Barang</th>
                <th width={100}>Harga</th>
                <th width={100}>Jumlah</th>
                <th width={100}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.cart.map((row, index) => (
                <tr key={index}>
                  <td>{row.nama_barang}</td>
                  <td>Rp. {row.harga}</td>
                  <td>x {row.stok}</td>
                  <td>Rp. {row.total_harga}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>Total</td>
                <td>Rp. {invoice.totalHarga}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
      <TableContainer component={Paper}>
        <TableContainer sx={{ minWidth: 400 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell width={140}>Nama Pembeli :</TableCell>
              <TableCell width={100}>Umum</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={100}>Nama Barang</TableCell>
              <TableCell width={100} align="right">
                Harga.
              </TableCell>
              <TableCell width={100} align="right">
                Jumlah
              </TableCell>
              <TableCell width={100} align="right">
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.cart.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.nama_barang}</TableCell>
                <TableCell align="right">Rp. {row.harga}</TableCell>
                <TableCell align="center">x {row.stok}</TableCell>
                <TableCell align="right">Rp. {row.total_harga}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell align="right" colSpan={3}>
                Total Harga
              </TableCell>
              <TableCell align="right">Rp. {invoice.totalHarga}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </TableContainer>
    </>
  );
};

export default Invoice;
