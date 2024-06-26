import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";

const BarangJual = (props) => {
  const handleClick = (id) => {
    props.pilih(id);
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR", // You can change this to your desired currency code
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "nama_barang", //access nested data with dot notation
        header: "Nama Barang",
        size: 200,
        //text capitalize
      },
      {
        accessorKey: "harga",
        header: "Harga",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <span>{formatter.format(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "stok", //normal accessorKey
        header: "Stok",
        size: 100,
      },
      {
        accessorKey: "id", //normal accessorKey
        header: "Pilih",
        size: 100,
        Cell: ({ cell }) => {
          return (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleClick(cell.getValue())}
            >
              <i className="fa-solid fa-circle-plus" />
            </button>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: props.barang, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    muiTableBodyCellProps: ({ cell }) => ({
      onClick: () => {
        handleClick(cell.row.original.id);
      },
      sx: {
        textTransform: "capitalize",
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
