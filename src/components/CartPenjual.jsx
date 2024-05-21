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
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const CartPenjual = (props) => {
  const [cart, setCart] = useState([]);
  /* const uniqueData = [...new Set(cart)]; */
  const [totalHarga, setTotalHarga] = useState(0);
  const [bayar, setBayar] = useState(0);
  const [pelanggan, setPelanggan] = useState([]);
  const [pilihPelanggan, setPilihPelanggan] = useState("");
  const [invoice, setInvoice] = useState({
    pelanggan: "",
    cart: [
      {
        id: "",
        nama_barang: "",
        harga: "",
        stok: 0,
        total_harga: "",
        pelanggan: "",
      },
    ],
    totalHarga: 0,
  });
  const [alert, setAlert] = useState(false);

  const cookie = new Cookies();
  const token = cookie.get("token");

  const findId = (id) => {
    return cart.find((item) => item.id == id);
  };

  const getPelanggan = async () => {
    await fetch("http://localhost:3000/api/pelanggan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPelanggan(data);
      });
  };

  useEffect(() => {
    getPelanggan();
  }, []);

  useEffect(() => {
    if (!findId(props.pilih)) {
      props.barang.map((item) =>
        item.id === props.pilih
          ? setCart([
              ...cart,
              {
                id: item.id,
                pelanggan: pilihPelanggan,
                nama_barang: item.nama_barang,
                harga: item.harga,
                stok: 1,
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
    /* setTotalHarga(
      cart.reduce((a, b) => {
        return a + b.total_harga;
      }, 0)
    ); */
    const newTotal = cart.reduce((a, b) => {
      return a + b.total_harga;
    }, 0);

    setTotalHarga(newTotal);

    /* setInvoice({ ...invoice, cart: cart }); */
    setInvoice({
      pelanggan: pilihPelanggan,
      cart: cart,
      totalHarga: newTotal,
    });
  }, [cart]);

  const jumlah = (e, nama, harga, diskon) => {
    if (e.target.value < 1) {
      e.target.value = 1;
    }
    const newCart = cart.map((item) =>
      item.nama_barang === nama
        ? {
            ...item,
            total_harga: harga * e.target.value - diskon,
            stok: parseInt(e.target.value),
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
            diskon: Number(e.target.value),
            total_harga: harga * jumlah - e.target.value,
          }
        : item
    );
    setCart(newCart);
  };

  const handleDelete = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const handlePilihPelanggan = (e) => {
    setPilihPelanggan(e.target.value);
    setInvoice({ ...invoice, pelanggan: e.target.value });
    cart.map((item) => (item.pelanggan = e.target.value));
    console.log(cart);
  };

  const navigate = useNavigate();

  const handleBayar = (e) => {
    e.preventDefault();
    localStorage.setItem("invoice", JSON.stringify(invoice));
    localStorage.setItem("kembalian", bayar - invoice.totalHarga);

    /* invoice.created_at = date;
    const newCart = cart.map((item) => ({
      ...item,
      pelanggan: pilihPelanggan,
    }));
    setCart(newCart);
    invoice.cart = cart;
    localStorage.setItem("invoice", JSON.stringify(invoice));
    console.log(invoice); */

    if (bayar >= totalHarga && invoice.pelanggan !== "" > 0) {
      fetch("http://localhost:3000/api/laporan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(invoice),
      }).then(async () => {
        console.log("transaksi berhasil");
        await updateStok(cart);
        setPilihPelanggan("");
        setCart([]);
        setBayar(0);
        props.getData();
        setAlert(true);
        navigate("/invoice");
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
                <TableCell width={50}>Nama Pembeli :</TableCell>
                <TableCell width={100} align="left">
                  {/* <Select
                    onChange={(e) => setPilihPelanggan(e.target.value)}
                    required
                  >
                    <MenuItem selected disabled defaultValue="">
                      Pilih Pelanggan
                    </MenuItem>
                    {pelanggan.map((item, index) => (
                      <MenuItem value={item.nama} key={index} defaultValue="">
                        {item.nama}
                      </MenuItem>
                    ))}
                  </Select> */}
                  <div>
                    <select
                      onChange={(e) => handlePilihPelanggan(e)}
                      className="form-select"
                      required
                      value={pilihPelanggan}
                    >
                      <option value="" selected disabled>
                        Pilih Pelanggan
                      </option>
                      {pelanggan.map((item, index) => (
                        <option value={item.nama} key={index}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                </TableCell>
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
                  Diskon
                </TableCell>
                <TableCell width={100} align="right">
                  Total
                </TableCell>
                <TableCell width={100} align="center">
                  {cart.length ? "Hapus" : ""}
                </TableCell>
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
                        diskon(e, row.nama_barang, row.harga, row.stok)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">Rp. {row.total_harga}</TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(row.id)}
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
                <TableCell colSpan={5} align="center">
                  <button className="btn btn-success" type="submit">
                    <i className="fa-solid fa-cart-shopping" /> Bayar
                  </button>
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell colSpan={5} align="right">
                  <button
                    className="btn btn-success"
                    type="submit"
                  >
                    <i className="fa-solid fa-cart-shopping" /> Bayar
                  </button>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </form>
      </TableContainer>
    </div>
  );
};

export default CartPenjual;
