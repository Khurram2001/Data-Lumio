import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TextPop } from "../landing navbar/index";

const Menu = ({ drawerOpen, setDrawerOpen, navItems, handleNavClick }) => {
  return (
    <>
      <IconButton
        edge="end"
        onClick={() => setDrawerOpen(true)}
        sx={{ color: "#0A3235" }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 250, px: 2 }}>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              // onClick={() => handleNavClick(item.path)}
              onClick={() => handleNavClick(item)}
            >
              <ListItemText
                primary={<TextPop variant="body1">{item.label}</TextPop>}
              />
            </ListItem>
          ))}
          <ListItem button onClick={() => handleNavClick({ path: "/login" })}>
            <Button
              variant="outlined"
              sx={{
                background: "#EAEAEA",
                border: "none",
                color: "#0A3235",
                borderRadius: "8px",
                padding: { xs: "4px 12px", sm: "6px 22px" },
                textTransform: "none",
                fontWeight: 500,
                fontFamily: "'Poppins', sans-serif",
                transition: "all 0.4s ease",
                "&:hover": {
                  background: "#F0CB52",
                },
              }}
            >
              Login
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Menu;
