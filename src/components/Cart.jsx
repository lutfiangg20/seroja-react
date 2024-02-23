import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import updateStok from "../utility/updateStok";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  /* const uniqueData = [...new Set(cart)]; */
  const [totalHarga, setTotalHarga] = useState(0);
  const [bayar, setBayar] = useState(0);
  const [invoice, setInvoice] = useState(null);
  const [alert, setAlert] = useState(false);

  const findId = (id) => {
    return cart.find((item) => item.id == id);
  };

  useEffect(() => {
    if (!findId(props.pilih)) {
      props.barang.map((item) =>
        item._id === props.pilih
          ? setCart([
              ...cart,
              {
                id: item._id,
                nama_barang: item.nama_barang,
                harga: item.harga,
                stok: 1,
                total_harga: 0,
                jenis: "ecer",
              },
            ])
          : null
      );
    }
  }, [props.pilih]);

  useEffect(() => {
    setTotalHarga(
      cart.reduce((a, b) => {
        return a + b.total_harga;
      }, 0)
    );

    setInvoice({
      pelanggan: "ecer",
      cart: cart,
    });
  }, [cart]);

  const jumlah = (e, nama, harga) => {
    if (e.target.value < 1) {
      e.target.value = 1;
    }
    const newCart = cart.map((item) =>
      item.nama_barang === nama
        ? {
            ...item,
            total_harga: harga * e.target.value,
            stok: parseInt(e.target.value),
          }
        : item
    );
    setCart(newCart);
  };

  const handleDelete = (nama) => {
    const newCart = cart.filter((item) => item.nama_barang !== nama);
    setCart(newCart);
  };

  const handleBayar = (e) => {
    e.preventDefault();

    if (bayar >= totalHarga) {
      fetch("http://localhost:3000/laporan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(invoice),
      }).then(() => {
        console.log("transaksi berhasil");
        updateStok(cart);
        setCart([]);
        setBayar(0);
        console.log("bayar", bayar);
        props.getData();
        setAlert(true);
      });
    }
    if (bayar < totalHarga) {
      console.log("duit mu kurang");
    }
  };

  return (
    <div className="">
      <TableContainer component={Paper}>
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
                  <TableCell>{row.nama_barang}</TableCell>
                  <TableCell align="right">{row.harga}</TableCell>
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
                      onChange={(e) => jumlah(e, row.nama_barang, row.harga)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">Rp. {row.total_harga}</TableCell>
                  <TableCell align="center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(row.nama_barang)}
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
                <TableCell align="right">Rp. {totalHarga}</TableCell>
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
                        onChange={(e) => setBayar(e.target.value)}
                        value={bayar}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <button
                    className="btn btn-success"
                    type="submit"
                    /*  onClick={handleBayar} */
                  >
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

export default Cart;
