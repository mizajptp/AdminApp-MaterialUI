"use client";

import AppSnackBar from "@/app/components/AppSnackBar";
import ErrorDialog from "@/app/components/ErrorDialog";
import ProductForm from "@/app/components/ProductForm";
import { CategoriesService } from "@/app/services/categories-service";
import { ProductsService } from "@/app/services/products-service";
import { Box, CircularProgress } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [categories, setCategories] = useState<any[]>([]);
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    price: 0,
    description: "",
    categoryId: "",
    images: [""],
  });

  async function fetchData() {

    try {
      const [productRes, categoriesRes] = await Promise.all([
        ProductsService.getById(Number(id)),
        CategoriesService.getAll(),
      ]);

      setProduct({
        id: productRes.id,
        title: productRes.title,
        price: productRes.price,
        description: productRes.description,
        categoryId: productRes.category.id,
        images: productRes.images,
      });

      setCategories(categoriesRes);
    } catch {
      setErrorMessage("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = async () => {

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

      await ProductsService.update(Number(id), {
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.categoryId,
        images: product.images,
      });
      
      setSuccessMessage("Product updated successfully!");
      router.push("/dashboard/products");
    } catch {
      setErrorMessage("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/products");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={25}>
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  return (
    <>
      <ProductForm
        pageTitle="Edit Product"
        showId={true}
        product={product}
        categories={categories}
        saving={saving}
        onChange={handleChange}
        onSubmit={handleEdit}
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
