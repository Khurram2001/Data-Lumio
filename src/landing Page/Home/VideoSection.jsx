import React from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { Text, TextPop } from "../Home/index";
import { useNavigate } from "react-router-dom";
import { canon } from "../../seo";
import { Helmet } from "react-helmet-async";
const VideoSection = () => {
   const url = canon("/demo");
   const navigate = useNavigate();
   const isLargeDevice = useMediaQuery(
      "(min-width:1150px) and (min-height:650px)"
   );

   return (
      <>
         <div className="mb-[120px]">
            <Box
               sx={{
                  height: {
                     xs: "90vh", // Increased height
                     sm: "95vh",
                     md: isLargeDevice ? "100vh" : "120vh",
                  },
                  position: "relative",
               }}
            >
               {/* Top yellow section */}
               <Box
                  sx={{
                     height: { xs: "45%", sm: "55%", md: "60%" },
                     backgroundColor: "#F0CB52",
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "start",
                     textAlign: "center",
                     px: { xs: 1, sm: 3 },
                     py: 4,
                  }}
               >
                  <Text
                     variant="h2"
                     sx={{
                        fontSize: { xs: 20, sm: 24 },
                        fontWeight: 700,
                        color: "#0A3235",
                        mb: 1,
                     }}
                  >
                     See DataLumio in Action
                  </Text>
                  <TextPop
                     sx={{
                        fontSize: { xs: 16, sm: 18 },
                        fontWeight: 500,
                        color: "#0A3235",
                        mb: 4,
                     }}
                  >
                     Watch how effortlessly you can transform complex data into
                     insightful reports—no technical skills required.
                  </TextPop>
               </Box>

               {/* Spacer for layout */}
               <Box sx={{ height: "50%" }} />

               {/* Embedded video section */}
               <Box
                  sx={{
                     position: "absolute",
                     top: "60%",
                     left: "50%",
                     transform: "translate(-50%, -50%)",
                     width: { xs: "100%", sm: "90%", md: "80%" },
                     height: { xs: "55%", sm: "65%", md: "80%" }, // Increased height
                     boxShadow: 3,
                     borderRadius: "12px",
                     overflow: "hidden",
                  }}
               >
                  <video
                     width="100%"
                     height="100%"
                     autoPlay
                     muted
                     loop
                     playsInline
                     onEnded={(e) => e.target.play()} // Ensures video restarts if loop fails
                     style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        display: "block",
                     }}
                  >
                     <source
                        src="https://datalumio.s3.us-west-2.amazonaws.com/landingPage/DataLumio-Demo-Video3.mp4"
                        type="video/mp4"
                     />
                     Your browser does not support the video tag.
                  </video>
               </Box>

               {/* CTA Button */}
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     mt: { xs: -9, sm: -4 },
                  }}
               >
                  <Button
                     variant="contained"
                     onClick={() => navigate("/login")}
                     sx={{
                        padding: { xs: "12px 30px", sm: "14px 46px" },
                        background: "#F0CB52",
                        color: "#0A3235",
                        fontSize: { xs: "12px", sm: "16px" },
                        fontWeight: 600,
                        fontFamily: "'Poppins', sans-serif",
                        fontStyle: "italic",
                        textTransform: "capitalize",
                        "&:hover": { background: "#84F052" },
                     }}
                  >
                     Want to try it yourself? Get started
                  </Button>
               </Box>
            </Box>
         </div>
      </>
   );
};

export default VideoSection;
