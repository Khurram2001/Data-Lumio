import { Grid, Stack, Typography, styled, useMediaQuery } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import footerLogo from "../../assets/authIcon.png";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { TextPop } from "../Home";

const Heading = styled(Typography)({
   color: "#F0CB52",
   fontSize: "18px",
   fontWeight: 700,
   fontFamily: "Poppins",
});
const Text = styled(Typography)({
   color: "#fff",
   fontSize: "14px",
   fontFamily: "Poppins",
   fontWeight: 400,
});
const Footer = () => {
   const isMobile = useMediaQuery("(max-width:600px)");
   const isSmall = useMediaQuery("(max-width:1024px)");
   const navigate = useNavigate();
   const location = useLocation();

   // const handleNavigation = (url) => {
   //   navigate(url);
   //   window.scrollTo(0, 0);
   // };
   const handleNavigation = (path, sectionId) => {
      if (location.pathname === path) {
         // If already on the path, just scroll
         if (sectionId) {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: "smooth" });
         }
      } else {
         // Navigate to path, then scroll after navigation
         navigate(path, { replace: false });

         // Use a small delay to wait for page to load and element to exist
         // Or better, use a global scroll handler (see below)
         setTimeout(() => {
            if (sectionId) {
               const el = document.getElementById(sectionId);
               if (el) el.scrollIntoView({ behavior: "smooth" });
            }
         }, 300);
      }
   };

   return (
      <footer
         style={{
            background: "#0D1C1C",
            padding: "50px 40px",
         }}
      >
         <Grid
            container
            spacing={5}
            sx={{
               display: "flex",
               justifyContent: { lg: "space-between" },
               flexWrap: "wrap",
            }}
         >
            <Grid item xs={12} sm={6} md={4} lg={3}>
               <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                     src={footerLogo}
                     alt="logo"
                     width={isMobile ? 20 : 25}
                     height={isMobile ? 20 : 25}
                  />
                  {/* {!isMobile && ( */}
                  <Typography
                     sx={{
                        color: "#F0CB52",
                        fontSize: "18px",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                     }}
                     onClick={() => handleNavigation("/")}
                     style={{ cursor: "pointer" }}
                  >
                     DataLumio
                  </Typography>
                  {/* )} */}
               </Stack>
               <br />
               <TextPop
                  sx={{ maxWidth: { xs: "100%", sm: "90%", md: "350px" } }}
               >
                  DataLumio is an AI-powered web tool that automates the
                  analysis of qualitative and quantitative research data. It
                  transforms raw data into clear, visual reports—saving time and
                  boosting research productivity.
               </TextPop>
            </Grid>

            <Grid
               item
               xs={12}
               sm={6}
               md={4}
               lg={3}
               sx={{
                  color: "#FFFFFF",
                  fontFamily: "Poppins",
                  fontSize: "14px",
               }}
            >
               <Heading>Quick Links</Heading>
               <br />
               <Stack direction={"row"} gap={3} flexWrap={"wrap"} mt={1}>
                  <Stack
                     direction={{ xs: "row", sm: "column" }}
                     gap={{ xs: 4 }}
                  >
                     <Text
                        onClick={() => handleNavigation("/")}
                        style={{ cursor: "pointer" }}
                     >
                        Home
                     </Text>
                     {/* {!isMobile && <br />} */}
                     <Text
                        onClick={() => handleNavigation("/")}
                        style={{ cursor: "pointer" }}
                     >
                        Blog
                     </Text>
                     {/* {!isMobile && <br />} */}
                     <Text
                        onClick={() => handleNavigation("/", "pricing")}
                        style={{ cursor: "pointer" }}
                     >
                        Pricing
                     </Text>
                  </Stack>
                  <Stack
                     direction={{ xs: "row", sm: "column" }}
                     gap={{ xs: 4 }}
                  >
                     <Text
                        onClick={() => handleNavigation("/", "features")}
                        style={{ cursor: "pointer" }}
                     >
                        Features
                     </Text>
                     {/* {!isMobile && <br />} */}
                     <Text
                        onClick={() => handleNavigation("/data-security")}
                        style={{ cursor: "pointer" }}
                     >
                        Data Security
                     </Text>
                     {/* {!isMobile && <br />} */}
                     <Text
                        onClick={() => handleNavigation("/contact-us")}
                        style={{ cursor: "pointer" }}
                     >
                        Contact Us
                     </Text>
                  </Stack>
               </Stack>
               {/* {!isMobile && <br />} */}
            </Grid>

            <Grid
               item
               xs={12}
               sm={6}
               md={4}
               lg={3}
               sx={{
                  color: "#FFFFFF",
                  fontFamily: "Poppins",
                  fontSize: "14px",
               }}
            >
               <Heading>Social</Heading>
               <br />

               <Stack direction={"column"} gap={4} mt={1}>
                  <a
                     href="https://www.linkedin.com/company/datalumio/about/"
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{ textDecoration: "none" }}
                  >
                     <Text>
                        <LinkedIn sx={{ marginRight: "10px" }} />
                        LinkedIn
                     </Text>
                  </a>
                  <a
                     href="https://x.com/DataLumio"
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{ textDecoration: "none" }}
                  >
                     <Text>
                        <XIcon sx={{ marginRight: "10px" }} />
                        X.com
                     </Text>
                  </a>
                  <a
                     href="https://www.facebook.com/profile.php?id=61577569461059&mibextid=wwXIfr&rdid=akKevO99iofzUHiS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16gupCb9sF%2F%3Fmibextid%3DwwXIfr#"
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{ textDecoration: "none" }}
                  >
                     <Text>
                        <Facebook sx={{ marginRight: "10px" }} /> Facebook
                     </Text>
                  </a>
               </Stack>
               <br />
               <br />
            </Grid>
            <Grid
               item
               xs={12}
               sm={6}
               md={4}
               lg={3}
               sx={{
                  color: "#FFFFFF",
                  fontFamily: "Poppins",
                  fontSize: "14px",
               }}
            >
               <Heading>Contact</Heading>
               {/* <br /> */}

               <Stack direction="column" spacing={1} sx={{ marginTop: "28px" }}>
                  <Typography
                     sx={{
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontFamily: "Poppins",
                     }}
                  >
                     Email: Info@datalumio.co
                  </Typography>
               </Stack>

               <Stack
                  direction="column"
                  alignItems="center"
                  spacing={1}
                  sx={{ marginTop: "20px" }}
               >
                  <Typography
                     sx={{
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontFamily: "Poppins",
                        maxWidth: { xs: "100%", md: "350px" },
                     }}
                  >
                     Level 1, Devonshire House, One Mayfair Place, London,
                     United Kingdom
                  </Typography>
               </Stack>
               <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ marginTop: "20px" }}
               >
                  <Typography
                     sx={{
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontFamily: "Poppins",
                     }}
                  >
                     Copyright
                  </Typography>
                  <Typography
                     sx={{
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontFamily: "Poppins",
                     }}
                  >
                     {new Date().getFullYear()}
                  </Typography>
                  <Typography
                     sx={{
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontWeight: 400,
                        fontFamily: "Poppins",
                     }}
                  >
                     |
                  </Typography>
                  <Typography
                     sx={{
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontWeight: 400,
                        fontFamily: "Poppins",
                     }}
                  >
                     DataLumio
                  </Typography>
               </Stack>
               <br />
               <br />
            </Grid>
         </Grid>
      </footer>
   );
};

export default Footer;
