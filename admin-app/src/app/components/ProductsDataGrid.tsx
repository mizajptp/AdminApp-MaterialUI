import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Link from "next/link";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductsDataGrid({
  products,
  total,
  loading,
  page,
  pageSize,
  onPaginationModelChange,
  handleDelete,
}: any) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },

    {
      field: "images",
      headerName: "Image",
      width: 100,

      renderCell: (params) => (
        <img
          src={params.value[0]}
          alt="product"
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
      ),
    },

    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },

    {
      field: "price",
      headerName: "Price",
      width: 120,

      renderCell: (params) => <>${params.value}</>,
    },

    {
      field: "category",
      headerName: "Category",
      width: 180,

      renderCell: (params) => <>{params.value.name}</>,
    },

    {
      field: "actions",
      headerName: "",
      width: 150,

      renderCell: (params) => (
        <Box>
          <Button
            startIcon={<EditIcon />}
            size="small"
            component={Link}
            href={`/dashboard/products/${params.row.id}/edit`}
          ></Button>
          <Button
            startIcon={<DeleteIcon />}
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          ></Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <DataGrid
        rows={products}
        columns={columns}
        loading={loading}
        rowCount={total}
        getRowId={(row) => row.id}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[10, 20, 30]}
      ></DataGrid>
    </Box>
  );
}
