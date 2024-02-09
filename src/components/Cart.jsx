import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const Cart = (props) => {
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
                total_harga: 0,
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

  const jumlah = (e, nama, harga) => {
    const newCart = cart.map((item) =>
      item.nama_barang === nama
        ? { ...item, total_harga: harga * e.target.value, qty: e.target.value }
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
        },
        /* body: JSON.stringify({
          nama_barang: cart.map((item) => item.nama_barang),
          qty: cart.map((item) => item.qty),
          total_harga: cart.map((item) => item.total_harga),
          bayar: bayar,
        }), */
        body: JSON.stringify(cart),
      });
      console.log("transaksi berhasil");
      setCart([]);
      setBayar(0);
    }
    if (bayar < totalHarga) {
      console.log("duit mu kurang");
    }
  };

  return (
    <div className="">
      {/* <div className="card-body">
        <table className="table-hover table">
          <thead>
            <tr className="text-capitalize">
              <th style={{ width: "5%" }}>no.</th>
              <th>nama barang</th>
              <th>harga</th>
              <th style={{ width: "10%", textAlign: "center" }}>jumlah</th>
              <th>total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr className="text-capitalize" key={index}>
                <td>{index + 1}</td>
                <td>{item.nama_barang}</td>
                <td>Rp. {item.harga}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => jumlah(e, item.nama_barang, item.harga)}
                  />
                </td>
                <td>Rp. {item.total_harga}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    <i className="fa-solid fa-trash-can" />
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <th colSpan={2} className="text-capitalize">
                total harga :
              </th>
              <th />
              <th />
              <td>Rp.{totalHarga}</td>
              <td className="text-center"></td>
            </tr>
            <tr>
              <th />
              <th />
              <th />
              <th />
              <th>
                <div className="form-inline">
                  <div className="form-group">
                    Rp.
                    <input
                      type="number"
                      className="form-control ml-1"
                      onChange={(e) => setBayar(e.target.value)}
                      value={bayar}
                    />
                  </div>
                </div>
              </th>
              <th>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={handleBayar}
                >
                  <i className="fa-solid fa-cart-shopping" /> Bayar
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div> */}
      {/* /.card-body */}
      <TableContainer component={Paper}>
        <form onSubmit={handleBayar}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              {/*  <TableRow>
              <TableCell align="center" colSpan={3}>
                Detail
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow> */}
              <TableRow>
                <TableCell>Nama Barang</TableCell>
                <TableCell align="right">Harga.</TableCell>
                <TableCell align="right">Jumlah</TableCell>
                <TableCell align="right" width={150}>
                  Total
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.nama_barang}</TableCell>
                  <TableCell align="right">{row.harga}</TableCell>
                  <TableCell align="right" width={120}>
                    {" "}
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => jumlah(e, row.nama_barang, row.harga)}
                    />
                  </TableCell>
                  <TableCell align="right" width={120}>
                    Rp. {row.total_harga}
                  </TableCell>
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
                    type="button"
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
