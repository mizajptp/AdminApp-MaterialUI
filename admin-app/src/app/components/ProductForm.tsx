import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AddButton } from "./Buttons";

export default function ProductForm({
  pageTitle,
  showId,
  product,
  categories,
  saving,
  onChange,
  onSubmit,
  onCancel,
}: any) {
  return (
    <>
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 2 }}>
        <Typography variant="h5">{pageTitle}</Typography>

        {showId && (
          <TextField
            label="ID"
            fullWidth
            value={product.id}
            disabled
            margin="normal"
          />
        )}

        <TextField
          label="Title"
          fullWidth
          value={product.title}
          onChange={(e) => onChange("title", e.target.value)}
          margin="normal"
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          value={product.price}
          onChange={(e) => onChange("price", Number(e.target.value))}
          margin="normal"
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={product.description}
          onChange={(e) => onChange("description", e.target.value)}
          margin="normal"
        />

        <TextField
          select
          label="Category"
          fullWidth
          margin="normal"
          value={product.categoryId}
          onChange={(e) => onChange("categoryId", Number(e.target.value))}
        >
          {categories.map((cat: any) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Image URL"
          fullWidth
          value={product.images[0]}
          onChange={(e) => onChange("images", [e.target.value])}
          margin="normal"
        />

        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ flex: 1 }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <AddButton
            variant="contained"
            sx={{ flex: 3 }}
            onClick={onSubmit}
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} /> : "Save"}
          </AddButton>
        </Box>
      </Box>
    </>
  );
}
