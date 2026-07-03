// components/ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";
import { Box, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return show ? (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 1000,
      }}
    >
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{ background: "#F0CB52", color: "#0A3235", "&:hover": { background: "#84F052" } }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
  ) : null;
};

export default ScrollToTopButton;
