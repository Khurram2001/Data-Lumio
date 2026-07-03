import { Box } from "@mui/material";
import React from "react";
import Navbar from "../landing navbar";
import { Text, TextPop } from "../Home";
import ContactCard from "./ContactCard";
import Footer from "../Footer";
import { Helmet } from "react-helmet-async";
import { canon } from "../../seo";
const Contact = () => {
   const url = canon("/contact-us");
   return (
      <>
         <Helmet>
            <title>Contact Us | DataLumio</title>
            <meta
               name="description"
               content="Get in touch with the DataLumio team. Whether you need support, have questions, or want to learn more about our AI-powered solutions, we're here to help."
            />
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} />
         </Helmet>
         <main>
            <div className="pb-2">
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
                     //   pl: { xs: "20px", sm: "65px" },
                     //   pr: { xs: "20px", sm: "65px", lg: "80px" },
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
                        We're Here to Help You Analyze Smarter
                     </Text>
                  </Box>
               </Box>

               <Box
                  sx={{
                     px: { xs: "20px", sm: "65px" },
                  }}
               >
                  <ContactCard />
               </Box>
            </div>
            <Footer />
         </main>
      </>
   );
};

export default Contact;
