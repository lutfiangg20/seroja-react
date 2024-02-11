import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";

const BarangJual = (props) => {
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
      <MaterialReactTable table={table} />
    </div>
  );
};

export default BarangJual;
