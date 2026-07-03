import React, { useEffect, useState } from "react";
import { Box, IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Sidebar from "./Sidebar";

const drawerWidth = 270;

const Layout = ({ children }) => {
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const isMediumScreen = useMediaQuery("(min-width:900px)");
  const [open, setOpen] = useState(isLargeScreen);
  const smallHeightLaptop = useMediaQuery(
    "(max-height:700px) and (min-width:600px)"
  );

  useEffect(() => {
    setOpen(isMediumScreen);
  }, [isMediumScreen]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Toggle Button */}
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          top: { xs: 14, sm: smallHeightLaptop ? 16 : 18 },
          left: open ? drawerWidth - 50 : 16,
          zIndex: 1400,
          color: "#fff",
          transition: "left 0.3s ease",
        }}
      >
        {open ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar Drawer with smooth slide */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: "100vh",
          backgroundColor: "#0A3235",
          position: "fixed",
          top: 0,
          left: 0,
          transform: open ? "translateX(0)" : `translateX(-${drawerWidth}px)`,
          transition: "transform 0.3s ease",
          zIndex: 1200,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 1.25 },
          overflowY: "auto",
          background: "#032629",
          marginLeft: isLargeScreen ? (open ? `${drawerWidth}px` : 0) : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
