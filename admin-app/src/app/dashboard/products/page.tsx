"use client";

import { AddButton } from "@/app/components/Buttons";
import { Box, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import ProductsDataGrid from "@/app/components/ProductsDataGrid";
import { GridPaginationModel } from "@mui/x-data-grid";
import DeleteDialog from "@/app/components/DeleteDialog";
import { ProductsService } from "@/app/services/products-service";
import ErrorDialog from "@/app/components/ErrorDialog";
import AppSnackBar from "@/app/components/AppSnackBar";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [currentId, setCurrentId] = useState<number | null>(null);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchTotal = async () => {
    const total = await ProductsService.getTotal();
    setTotal(total);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const offset = page * pageSize;

      const data = await ProductsService.getPaginated(offset, pageSize);

      setProducts(data);
    } catch {
      setErrorMessage("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

  const requestDelete = (id: number) => {
    setCurrentId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (!currentId) return;

      await ProductsService.delete(currentId);
      setProducts((prev) => prev.filter((p) => p.id !== currentId));
      setTotal((prev) => prev - 1);

      setSuccessMessage("Product deleted successfully!");
    } catch {
      setErrorMessage("Failed to delete product.");
    } finally {
      setDeleteDialogOpen(false);
      setCurrentId(null);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" margin={2}>
        <Typography variant="h5">Products</Typography>
        <AddButton startIcon={<AddIcon />} href="/dashboard/products/new">
          Add Product
        </AddButton>
      </Box>

      <ProductsDataGrid
        products={products}
        total={total}
        loading={loading}
        page={page}
        pageSize={pageSize}
        onPaginationModelChange={(model: GridPaginationModel) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        handleDelete={requestDelete}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      ></DeleteDialog>

      <AppSnackBar
        successMessage={successMessage}
        onClose={() => setSuccessMessage("")}
      />

      <ErrorDialog
        errorMessage={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </>
  );
}
