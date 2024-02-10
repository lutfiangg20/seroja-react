import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";

const BarangJual = (props) => {
  /*  const [cari, setCari] = useState("");
  const [filteredData, setFilteredData] = useState([]); */

  /*  useEffect(() => {
    const filtered = props.barang.filter((item) =>
      item.nama_barang.toLowerCase().includes(cari.toLowerCase())
    );
    setFilteredData(filtered);
  }, [cari, props.barang]); */

  /*  const [pilih, setPilih] = useState(null); */

  const handleClick = (id) => {
    props.pilih(id);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "nama_barang", //access nested data with dot notation
        header: "Nama Barang",
        size: 200,
      },
      {
        accessorKey: "harga",
        header: "Harga",
        size: 100,
      },
      {
        accessorKey: "stok", //normal accessorKey
        header: "Stok",
        size: 100,
      },
      {
        accessorKey: "_id", //normal accessorKey
        header: "Pilih",
        size: 100,
        Cell: () => (
          <button type="button" className="btn btn-success">
            <i className="fa-solid fa-circle-plus" />
          </button>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: props.barang, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiTableBodyCellProps: ({ cell }) => ({
      onClick: () => {
        handleClick(cell.row.original._id);
      },
    }),
  });

  return (
    <div className="">
      {/* <div className="row">
        <div className="form-group col-sm-6 row mb-0 ml-1 mt-3">
          <label htmlFor="perPage">
            Show:
            <select id="perPage">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </label>
        </div>
        <div className="form-group col-sm-6 row justify-content-end mb-0 mt-3">
          <div className>
            <input
              className="form-control"
              type="text"
              placeholder="Cari barang..."
              onChange={(e) => setCari(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table-hover table">
          <thead>
            <tr className="text-capitalize">
              <th>no.</th>
              <th>nama barang</th>
              <th>harga</th>
              <th>stok</th>
              <th>aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr className="text-capitalize" key={index}>
                <td>{index + 1}</td>
                <td>{item.nama_barang}</td>
                <td>{item.harga}</td>
                <td>{item.stok}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleClick(item._id)}
                  >
                    <i className="fa-solid fa-circle-plus" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      {/* /.card-body */}
      <MaterialReactTable table={table} />
    </div>
  );
};

export default BarangJual;
