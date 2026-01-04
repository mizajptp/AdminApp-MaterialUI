"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorDialog from "./components/ErrorDialog";
import AppSnackBar from "./components/AppSnackBar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setErrorMessage("Invalid credentials");
        return;
      }

      const data = await res.json();

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      setSuccessMessage("Login successful!");

      const profileRes = await fetch(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      const profile = await profileRes.json();

      localStorage.setItem("username", profile.name);

      router.push("/dashboard/products");
    } catch {
      setErrorMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h6" mb={1}>
          Admin Login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Paper>

      <AppSnackBar
        successMessage={successMessage}
        onClose={() => setSuccessMessage("")}
      />

      <ErrorDialog
        errorMessage={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </Box>
  );
}
