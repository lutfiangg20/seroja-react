import { useEffect, useState } from "react";
import BarangJual from "../components/BarangJual";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import PembelianButtons from "../components/PembelianButtons";
/* import { useSelector } from "react-redux"; */

const Ecer = () => {
  /* const token = useSelector((state) => state.auth.token); */
  const token = localStorage.getItem("token");
  const getData = async () => {
    await fetch("http://localhost:3001/api/barang", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBarang(data);
      });
  };

  const [barang, setBarang] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const [pilih, setPilih] = useState(null);

  return (
    <Layout>
      <PembelianButtons
        barang={<BarangJual barang={barang} pilih={setPilih} />}
        cart={<Cart barang={barang} pilih={pilih} />}
      />
    </Layout>
  );
};

export default Ecer;
