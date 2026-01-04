import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { AddButton } from "./Buttons";

export default function CategoryDialog({
  open,
  onClose,
  onSave,
  name,
  setName,
  image,
  setImage,
  currentId,
}: any) {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{currentId ? "Edit Category" : "Add Category"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>

        <TextField
          label="Image"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></TextField>
      </DialogContent>

      <DialogActions sx={{ gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          sx={{ width: "100px" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        
        <AddButton size="small" sx={{ width: "100px" }} onClick={onSave}>
          Save
        </AddButton>
      </DialogActions>
    </Dialog>
  );
}
