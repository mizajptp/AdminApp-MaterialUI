"use client";

import AppSnackBar from "@/app/components/AppSnackBar";
import ErrorDialog from "@/app/components/ErrorDialog";
import ProductForm from "@/app/components/ProductForm";
import { CategoriesService } from "@/app/services/categories-service";
import { ProductsService } from "@/app/services/products-service";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AddProduct() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [categories, setCategories] = useState<any[]>([]);

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: "",
    images: [""],
  });

  async function fetchCategories() {
    try {
      const res = await CategoriesService.getAll();
      setCategories(res);
    } catch {
      setErrorMessage("Failed to load category.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
    if (
      !product.title ||
      product.price <= 0 ||
      !product.description ||
      !product.categoryId ||
      !product.images[0]
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      setSaving(true);

      await ProductsService.create(product);

      setSuccessMessage("New product added successfully!");
      router.push("/dashboard/products");
      
    } catch {
      setErrorMessage("Failed to create product.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/products");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <ProductForm
        pageTitle="Add Product"
        showId={false}
        product={product}
        categories={categories}
        saving={saving}
        onChange={handleChange}
        onSubmit={handleAddProduct}
        onCancel={handleCancel}
      />

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
