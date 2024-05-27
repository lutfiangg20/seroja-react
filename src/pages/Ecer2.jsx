import { useEffect, useState } from "react";
import CartEcer from "../components/CartEcer";
import Layout from "../components/Layout";
import Cookies from "universal-cookie";
import { display } from "@mui/system";

const Ecer2 = () => {
  const [barang, setBarang] = useState([]);
  const [filtered, setFiltered] = useState(barang);
  const [pilih, setPilih] = useState(null);
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState([]);

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
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (value) => {
    value !== "" ? setShow(true) : setShow(false);
    const filter = barang.filter((item) =>
      item.nama_barang.toLowerCase().includes(value)
    );
    setFiltered(filter);
  };

  const handlePilih = (e) => {
    e.preventDefault();
    barang.filter((item) => {
      const cek = cart.find((item) => {
        return item.id == pilih;
      });
      if (!cek) {
        if (item.id == pilih) {
          return setCart([...cart, item]);
        }
      }
    });
  };
  const test = barang.find((item) => item.id == 60);
  console.log(test);

  return (
    <Layout>
      <div className="card">
        <input
          type="text"
          className="form-control"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {show && (
          <form onSubmit={handlePilih}>
            <select
              name=""
              id=""
              className="form-select"
              multiple
              onChange={(e) => {
                setPilih(e.target.value);
              }}
            >
              {filtered.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.nama_barang}
                </option>
              ))}
            </select>
            <button type="submit" style={{ display: "none" }}></button>
          </form>
        )}
      </div>
      <CartEcer cart={cart} setCart={setCart} />
    </Layout>
  );
};

export default Ecer2;
