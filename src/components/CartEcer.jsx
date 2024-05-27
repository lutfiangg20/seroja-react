import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";

const CartEcer = ({ cart, setCart }) => {
  const [alert, setAlert] = useState(false);
  const handleBayar = () => {};

  const handleDelete = (id) => {
    const filter = cart.filter((item) => item.id !== id);
    setCart(filter);
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR", // You can change this to your desired currency code
  });

  return (
    <div className="card">
      <TableContainer>
        {alert && (
          <Alert
            severity="success"
            onClose={() => {
              setAlert(false);
            }}
          >
            Transaksi Berhasil.
          </Alert>
        )}
        <form onSubmit={handleBayar}>
          <Table sx={{ minWidth: 400 }} aria-label="spanning table">
            <TableHead>
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
                <TableCell width={100}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {row.nama_barang}
                  </TableCell>
                  <TableCell align="right">
                    {formatter.format(row.harga)}
                  </TableCell>
                  <TableCell align="right">
                    {/* <Input
                  type="number"
                  className=""
                  onChange={(e) => jumlah(e, row.nama_barang, row.harga)}
                /> */}
                    <TextField
                      id="outlined-number"
                      label="Number"
                      type="number"
                      /*  onChange={(e) => jumlah(e, row.nama_barang, row.harga)} */
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatter.format(row.total_harga)}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(row.id)}
                      type="button"
                    >
                      <i className="fa-solid fa-trash-can" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell align="right" colSpan={3}>
                  Total Harga
                </TableCell>
                <TableCell align="right">
                  {/*    {formatter.format(totalHarga)} */}
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <div className="d-flex justify-content-end">
                    <p className="mt-2">Rp.</p>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className="d-flex justify-content-end">
                    <div>
                      <input
                        type="number"
                        className="form-control ml-1"
                        /*    onChange={(e) => setBayar(e.target.value)}
                        value={bayar} */
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell colSpan={4} align="center">
                  <button className="btn btn-success" type="submit">
                    <i className="fa-solid fa-cart-shopping" /> Bayar
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </TableContainer>
    </div>
  );
};

export default CartEcer;
