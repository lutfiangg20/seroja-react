import { useEffect, useState } from "react";
import BarangJual from "../components/BarangJual";
import Layout from "../components/Layout";
import PembelianButtons from "../components/PembelianButtons";
import CartPenjual from "../components/CartPenjual";

const Penjual = () => {
  const token = localStorage.getItem("token");
  const [barang, setBarang] = useState([]);
  const getData = async () => {
    await fetch("http://localhost:3000/barang", {
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
  };

  useEffect(() => {
    getData();
  }, []);

  const [pilih, setPilih] = useState(null);
  return (
    <Layout>
      <PembelianButtons
        barang={<BarangJual barang={barang} pilih={setPilih} />}
        cart={<CartPenjual barang={barang} pilih={pilih} />}
      />
    </Layout>
  );
};

export default Penjual;
