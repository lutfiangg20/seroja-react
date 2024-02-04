import { useEffect, useState } from "react";
import BarangJual from "../components/BarangJual";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import PembelianButtons from "../components/PembelianButtons";

const Ecer = () => {
  const getData = async () => {
    await fetch("http://seroja.test/api/barang")
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
