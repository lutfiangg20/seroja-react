import { useEffect, useState } from "react";
import BarangJual from "../components/BarangJual";
import Layout from "../components/Layout";
import PembelianButtons from "../components/PembelianButtons";
import CartPenjual from "../components/CartPenjual";
import Cookies from "universal-cookie";
import { invoke } from "@tauri-apps/api";

const Penjual = () => {
  const [barang, setBarang] = useState([]);
  const cookie = new Cookies();
  const token = cookie.get("token");
  const getData = async () => {
    await fetch("http://localhost:3000/api/barang", {
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
      });

    /* invoke("get_barang", {}).then((res) => {
      res = JSON.parse(res);
      setBarang(res);
    }); */
  };

  useEffect(() => {
    getData();
  }, []);

  const [pilih, setPilih] = useState(null);
  return (
    <Layout>
      <PembelianButtons
        barang={<BarangJual barang={barang} pilih={setPilih} />}
        cart={<CartPenjual barang={barang} pilih={pilih} getData={getData} />}
      />
    </Layout>
  );
};

export default Penjual;
