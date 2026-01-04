"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import type {} from "@mui/x-data-grid/themeAugmentation";

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#66737cff",
        contrastText: "#f7fafcff",
        light: "#dddedfff",
        dark: "#b4b7b9ff",
      },
      secondary: {
        main: "#e99658ff",
        dark: "#d3864cff",
        contrastText: "#f5f2f1ff",
      },
    },
  });

  theme.components = {
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        columnHeaderTitle: {
          fontWeight: 600,
          textTransform: "uppercase",
        },
        row: {
          "&:hover": {
            backgroundColor: theme.palette.primary.contrastText,
          },
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.contrastText,
          borderRight: "1px solid #2d3a4a",
          paddingTop: "8px",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
        },
      },
    },
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
