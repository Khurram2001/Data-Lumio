import React, { useEffect } from "react";
import Navbar from "../landing navbar/index";
import LandingImg1 from "../../assets/landingImg-1.png";
import LandingImg2 from "../../assets/landingImg-2.png";
import LandingImg3 from "../../assets/landingImg-3.png";
import { Box, Button, styled, Typography, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeSection from "./HomeSection";
import Steps from "./Steps";
import Testimonials from "./Testimonials";
import Productivity from "./Productivity";
import Comparison from "./Comparison";
import TrustedBy from "./TrustedBy";
import Pricing from "./Pricing";
import GetStarted from "./GetStarted";
import VideoSection from "./VideoSection";
import Footer from "../Footer";
import { Helmet } from "react-helmet-async";
import { canon } from "../../seo";
export const Text = styled(Typography)({
   fontFamily: "'Space Grotesk', sans-serif",
   fontWeight: 400,
});

export const TextPop = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
   fontWeight: 400,
});

const LandingPage = () => {
   const url = canon("/");
   const navigate = useNavigate();
   const location = useLocation();
   const smallHeightLaptop = useMediaQuery(
      "(max-height:700px) and (min-width:600px)"
   );

   // Scroll to section based on query string like ?scrollTo=demo
   useEffect(() => {
      const params = new URLSearchParams(location.search);
      const scrollTo = params.get("scrollTo");

      if (scrollTo) {
         setTimeout(() => {
            const el = document.getElementById(scrollTo);
            if (el) el.scrollIntoView({ behavior: "smooth" });
         }, 300); // Delay ensures DOM is rendered
      }
   }, [location.search]);

   return (
      <>
         <Helmet>
            <title>
               DataLumio – Transform Your Research with AI-Powered Insights
            </title>
            <meta
               name="description"
               content="Turn data into deep insights with DataLumio’s AI-driven analytics: qualitative & quantitative data analysis, interactive dashboards, PDF chat, literature review, and secure, real-time reporting."
            />
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} />
         </Helmet>
         <main>
            <div className="pb-14">
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

               <Box sx={{ px: { xs: "20px", sm: "65px" } }}>
                  <HomeSection />
               </Box>

               <Box sx={{ mt: 4 }}>
                  <Steps />
               </Box>

               {/* 👇 Demo Section with ID */}
               <Box sx={{ mt: 4 }}>
                  <VideoSection />
               </Box>

               <Box sx={{ mt: { xs: 10, sm: 15 } }}>
                  <Testimonials />
               </Box>

               <Box sx={{ mt: 4 }}>
                  <Productivity />
               </Box>

               <Box>
                  <Comparison />
               </Box>

               <Box sx={{ mt: { xs: 6, sm: 10 } }}>
                  <TrustedBy />
               </Box>

               <Box>
                  <Pricing />
               </Box>

               <Box sx={{ px: { xs: "20px", sm: "65px" }, mt: 6 }}>
                  <GetStarted />
               </Box>
            </div>
            <Footer />
         </main>
      </>
   );
};

export default LandingPage;
