"use client";

import { AddButton } from "@/app/components/Buttons";
import { CategoriesService } from "@/app/services/categories-service";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import DeleteDialog from "@/app/components/DeleteDialog";
import CategoryDialog from "@/app/components/CategoryDialog";
import ErrorDialog from "@/app/components/ErrorDialog";
import AppSnackBar from "@/app/components/AppSnackBar";
import CategoryTable from "@/app/components/CategoryTable";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  const [currentId, setCurrentId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await CategoriesService.getAll();
      setCategories(res);
    } catch {
      setErrorMessage("Something went wrong!!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleAdd() {
    setCurrentId(null);
    setName("");
    setImage("");
    setCategoryDialogOpen(true);
  }

  function handleEdit(cat: any) {
    setCurrentId(cat.id);
    setName(cat.name);
    setImage(cat.image);
    setCategoryDialogOpen(true);
  }

  const handleSave = async () => {
    if (!name || !image) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await (currentId
        ? CategoriesService.update(currentId!, { name, image })
        : CategoriesService.create({ name, image }));

      setSuccessMessage(
        currentId
          ? "Category updated successfully!"
          : "Category added successfully!"
      );

      setCategoryDialogOpen(false);
      fetchCategories();
    } catch {
      setErrorMessage(
        currentId ? "Failed to update category." : "Failed to create category."
      );
    }
  };

  function requestDelete(id: number) {
    setCurrentId(id);
    setDeleteDialogOpen(true);
  }

  const handleDelete = async () => {
    if (!currentId) return;

    try {
      await CategoriesService.delete(currentId);
      setCategories((prev) => prev.filter((c) => c.id !== currentId));

      setSuccessMessage("Category deleted successfully!");
    } catch {
      setErrorMessage("Failed to delete category.");
    } finally {
      setDeleteDialogOpen(false);
      setCurrentId(null);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" margin={2}>
        <Typography variant="h5">Categories</Typography>
        <AddButton startIcon={<AddIcon />} onClick={handleAdd}>
          Add Category
        </AddButton>
      </Box>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={requestDelete}
      />

      <CategoryDialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        onSave={handleSave}
        name={name}
        setName={setName}
        image={image}
        setImage={setImage}
        currentId={currentId}
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
