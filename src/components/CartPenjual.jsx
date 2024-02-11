import {
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

const CartPenjual = (props) => {
  const [cart, setCart] = useState([]);
  /* const uniqueData = [...new Set(cart)]; */
  const [totalHarga, setTotalHarga] = useState(0);
  const [bayar, setBayar] = useState(0);

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
                qty: 1,
                diskon: 0,
                total_harga: 0,
                jenis: "penjual",
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
  }, [cart]);

  const jumlah = (e, nama, harga, diskon) => {
    const newCart = cart.map((item) =>
      item.nama_barang === nama
        ? {
            ...item,
            total_harga: harga * e.target.value - diskon,
            qty: e.target.value,
          }
        : item
    );
    setCart(newCart);
  };

  const diskon = (e, nama, harga, jumlah) => {
    const newCart = cart.map((item) =>
      item.nama_barang === nama
        ? {
            ...item,
            diskon: e.target.value,
            total_harga: harga * jumlah - e.target.value,
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
        body: JSON.stringify(cart),
      }).then(() => {
        console.log("transaksi berhasil");
        setCart([]);
        setBayar(0);
      });
    }
    if (bayar < totalHarga) {
      console.log("duit mu kurang");
    }
  };

  return (
    <div className="">
      <TableContainer component={Paper}>
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
                  Diskon
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
                      label="jumlah"
                      type="number"
                      onChange={(e) =>
                        jumlah(e, row.nama_barang, row.harga, row.diskon)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="outlined-number"
                      label="diskon"
                      type="number"
                      onChange={(e) =>
                        diskon(e, row.nama_barang, row.harga, row.qty)
                      }
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
                    >
                      <i className="fa-solid fa-trash-can" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell align="right" colSpan={4}>
                  Total Harga
                </TableCell>
                <TableCell align="right">Rp. {totalHarga}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align="right">
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
                <TableCell colSpan={5} align="right">
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

export default CartPenjual;
