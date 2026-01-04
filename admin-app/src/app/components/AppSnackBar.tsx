import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function AppSnackBar({ successMessage, onClose }: any) {
  return (
    <Snackbar
      open={!!successMessage}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success">{successMessage}</Alert>
    </Snackbar>
  );
}
