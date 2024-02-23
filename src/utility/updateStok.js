const updateStok = async (cart) => {
  await fetch("http://localhost:3000/update/stok", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(cart),
  })
    .then((res) => console.log(res.json()))
    .catch((err) => console.log(err));
};

export default updateStok;
