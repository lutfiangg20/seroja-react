const TableBarang = (props) => {
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr className="text-capitalize">
            <th>no.</th>
            <th>nama barang</th>
            <th>kategori</th>
            <th>stok</th>
            <th>Harga</th>
            <th className="text-center">aksi</th>
          </tr>
        </thead>
        <tbody>
          {props.barang.map((item, index) => (
            <tr className="text-capitalize" key={index}>
              <td>{index + 1}</td>
              <td>{item.nama_barang}</td>
              <td>{item.kategori}</td>
              <td>{item.stok}</td>
              <td>Rp. {item.harga}</td>
              <td className="text-center">
                <button type="button" className="btn btn-success">
                  <i className="fa-solid fa-pen-to-square" />
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => props.handleDelete(item.id)}
                >
                  <i className="fa-solid fa-trash-can" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBarang;
