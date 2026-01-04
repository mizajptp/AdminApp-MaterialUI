"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const drawerWidth = 240;

export default function AdminDrawer() {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { label: "Products", path: "/dashboard/products" },
    { label: "Categories", path: "/dashboard/categories" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            selected={pathname.startsWith(item.path)}
            onClick={() => router.push(item.path)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
