import Cookies from "universal-cookie";

const updateStok = async (cart) => {
  const cookie = new Cookies();
  const token = cookie.get("token");

  await fetch("http://localhost:3000/api/barang/stock", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(cart),
  })
    .then((res) => console.log(res.json()))
    .catch((err) => console.log(err));
};

export default updateStok;
