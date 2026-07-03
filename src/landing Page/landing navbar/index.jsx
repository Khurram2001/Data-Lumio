import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Stack, styled, useMediaQuery, useTheme } from "@mui/material";
import LandingIcon from "../../assets/icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "./Menu";

export const Text = styled(Typography)({
   fontFamily: "'Space Grotesk', sans-serif",
   fontWeight: 400,
});

export const TextPop = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
   fontWeight: 500,
   cursor: "pointer",
});

function Navbar() {
   const navigate = useNavigate();
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
   const [drawerOpen, setDrawerOpen] = useState(false);
   const location = useLocation();

   const navItems = [
      { label: "Home", path: "/" },
      { label: "Features", path: "/features" },
      { label: "Pricing", path: "/subscription-plan" },
      { label: "Demo", path: "/demo" },
      { label: "Blog", path: "http://blog.datalumio.co/" },
      { label: "Data Security", path: "/data-security" },
      { label: "Contact Us", path: "/contact-us" },
   ];

   const handleNavClick = (item) => {
      if (item.path.startsWith("http")) {
         window.open(item.path, "_blank");
      } else if (item.path) {
         navigate(item.path);
         setDrawerOpen(false);
      }
   };

   return (
      <AppBar
         position="static"
         sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            color: "#0A3235",
            boxShadow: "none",
            px: 1,
            py: 0.5,
         }}
      >
         <Container maxWidth="xl">
            <Toolbar
               disableGutters
               sx={{ display: "flex", justifyContent: "space-between" }}
            >
               <Stack direction={"row"} alignItems={"center"}>
                  <img
                     src={LandingIcon}
                     alt=""
                     className=" mr-2 text-[#0A3235] w-[30px] sm:w-[40px]"
                  />
                  <Text
                     variant="h6"
                     noWrap
                     sx={{
                        mr: 2,
                        display: { xs: "flex" },
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        color: "#0A3235",
                        textDecoration: "none",
                     }}
                  >
                     DataLumio
                  </Text>
               </Stack>

               {!isMobile && (
                  <Stack direction="row" spacing={2} alignItems="center">
                     {navItems.map((item) => (
                        <TextPop
                           key={item.label}
                           sx={{
                              py: 1,
                              px: 2,
                              borderRadius: "8px",
                              transition: "all 0.4s ease",
                              background:
                                 location.pathname === item.path
                                    ? "#52F064"
                                    : "transparent",
                              "&:hover": { background: "#52F064" },
                           }}
                           onClick={() => handleNavClick(item)}
                        >
                           {item.label}
                        </TextPop>
                     ))}
                  </Stack>
               )}

               {isMobile ? (
                  <Menu
                     drawerOpen={drawerOpen}
                     setDrawerOpen={setDrawerOpen}
                     navItems={navItems}
                     handleNavClick={handleNavClick}
                  />
               ) : (
                  <Button
                     variant="outlined"
                     onClick={() => navigate("/login")}
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
               )}
            </Toolbar>
         </Container>
      </AppBar>
   );
}

export default Navbar;
