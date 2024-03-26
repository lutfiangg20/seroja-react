import { useEffect, useState } from "react";
import BarangJual from "../components/BarangJual";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import PembelianButtons from "../components/PembelianButtons";
/* import Cookies from "universal-cookie"; */
import { invoke } from "@tauri-apps/api";

/* import { useSelector } from "react-redux"; */

const Ecer = () => {
  /* const token = useSelector((state) => state.auth.token); */
  /* const token = localStorage.getItem("token"); */
  /*  const cookie = new Cookies();
  const token = cookie.get("token"); */
  const [barang, setBarang] = useState([]);
  const getData = async () => {
    /* await fetch("http://localhost:3000/barang", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBarang(data);
      })
      .catch((err) => {
        console.log(err);
      }); */

    invoke("get_barang", {}).then((res) => {
      res = JSON.parse(res);
      setBarang(res);
    });
  };

  useEffect(() => {
    /*  cekLogin(); */
    getData();
  }, []);

  const [pilih, setPilih] = useState(null);

  return (
    <Layout>
      <PembelianButtons
        barang={<BarangJual barang={barang} pilih={setPilih} />}
        cart={<Cart barang={barang} pilih={pilih} getData={getData} />}
      />
    </Layout>
  );
};

export default Ecer;
