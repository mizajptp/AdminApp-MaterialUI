"use client";

import React, { useEffect, useState } from "react";
import AdminDrawer from "../components/AdminDrawer";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AppSnackBar from "../components/AppSnackBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    setUsername("");

    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const profileName = localStorage.getItem("username");

    if (!token) {
      router.replace("/");
    } else {
      setUsername(profileName || "");
      setChecking(false); // Token valid → show dashboard
    }
  }, [router]);

  // While checking token, show nothing
  // if (checking) return null;
  if (checking) {
  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Typography>Loading...</Typography>
    </Box>
  );
}

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Admin Dashboard
          </Typography>
          <Box display="flex" alignItems="center" gap={4}>
            <Typography>Hi {username}</Typography>
            <Button
              sx={{ color: "white", borderColor: "white" }}
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <AdminDrawer />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
