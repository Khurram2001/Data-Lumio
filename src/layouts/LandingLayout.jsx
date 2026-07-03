import React from "react";
import Navbar from "../landing Page/landing navbar/index";
import Footer from "../landing Page/Footer";
import { Box } from "@mui/material";

const LandingLayout = ({ children }) => {
   return (
      <>
         {/* Header / Navbar */}
         <Box
            sx={{
               zIndex: 1,
               pt: 2,
               mb: 2,
               position: "sticky",
               right: 5,
               left: 5,
               top: 0,
               px: { xs: "20px", sm: "65px" },
               backdropFilter: "blur(8px)",
               backgroundColor: "#0A323503",
               WebkitBackdropFilter: "blur(8px)",
            }}
         >
            <Navbar />
         </Box>

         {/* Page Content */}
         <div>{children}</div>

         {/* Footer */}
         <Footer />
      </>
   );
};

export default LandingLayout;
