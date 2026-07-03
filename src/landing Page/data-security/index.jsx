import { Box } from "@mui/material";
import React from "react";
import Navbar from "../landing navbar";
import { Text } from "../Home";
import SecurityCard from "./SecurityCard";
import Footer from "../Footer";
import { Helmet } from "react-helmet-async";
import { canon } from "../../seo";

const DataSecurity = () => {
   const url = canon("/data-security");
   return (
      <>
         <Helmet>
            <title>Privacy Policy | DataLumio</title>
            <meta
               name="description"
               content="Learn how DataLumio ensures your data privacy and security. Read our privacy policy to understand how we protect your information."
            />
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
         </Helmet>
         <main>
            <div className="pb-6">
               <Box
                  sx={{
                     zIndex: 1,
                     // py: 2,
                     pt: 2,
                     mb: 2,
                     position: "sticky",
                     right: 5,
                     left: 5,
                     top: 0,
                     px: { xs: "20px", sm: "65px" },
                     backdropFilter: "blur(8px)",
                     backgroundColor: "#0A323503", // semi-transparent
                     WebkitBackdropFilter: "blur(8px)", // for Safari support
                  }}
               >
                  <Navbar />
               </Box>

               <Box sx={{ my: 6 }}>
                  <Box sx={{ py: 2, width: "100%", background: "#22464980" }}>
                     <Text
                        variant="h1"
                        sx={{
                           textAlign: "center",
                           fontSize: { xs: "28px", sm: "32px" },
                           color: "#F0CB52",
                           fontWeight: 700,
                        }}
                     >
                        Privacy Policy
                     </Text>
                  </Box>
               </Box>

               <Box
                  sx={{
                     px: { xs: "20px", sm: "65px" },
                  }}
               >
                  <SecurityCard />
               </Box>
            </div>
            <Footer />
         </main>
      </>
   );
};

export default DataSecurity;
