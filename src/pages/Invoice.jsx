import { useEffect } from "react";

const Invoice = () => {
  const invoice = JSON.parse(localStorage.getItem("invoice"));
  const kembalian = localStorage.getItem("kembalian");
  console.log("ls : ", invoice);

  useEffect(() => {
    window.print();
    //redirect back(
    window.history.back();
  }, []);

  return (
    <>
      <h2 className="mb-3 ml-5 pl-5">SEROJA</h2>
      <table className="mb-2">
        <thead>
          <th>
            Pembeli :{" "}
            <span className="text-uppercase">{invoice.pelanggan}</span>
          </th>
        </thead>
        {invoice.cart.map((row, index) => (
          <tbody key={index}>
            <tr>
              <th colSpan={2} className="text-uppercase">
                {row.nama_barang}
              </th>
            </tr>
            <tr>
              <td>
                {row.stok} x Rp. {row.harga}{" "}
                {row.diskon ? `- Rp. ${row.diskon}` : ""}=
              </td>
              <td> Rp. {row.total_harga}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <hr />
      <table style={{ width: "20%" }}>
        <tbody>
          <tr>
            <td>Total Bayar : </td>
            <td>Rp. {invoice.totalHarga}</td>
          </tr>
          <tr>
            <td>Kembalian : </td>
            <td>Rp. {kembalian}</td>
          </tr>
        </tbody>
      </table>
      <h2 className="ml-5 pl-1 mt-5 mb-5">TERIMA KASIH</h2>
      <br />
      <div>
        <u>
          ...............................................................................................
        </u>
      </div>
    </>
  );
};

export default Invoice;
