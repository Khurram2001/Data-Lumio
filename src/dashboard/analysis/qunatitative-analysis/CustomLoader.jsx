// src/components/CustomLoader.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { RingLoader } from "react-spinners";

const CustomLoader = ({ isEmbeddingLoading, isReportLoading }) => {
   return (
      <Box
         display="flex"
         alignItems="center"
         justifyContent="center"
         flexWrap={"wrap"}
         bgcolor="#3F5A5C"
         flexDirection={{ xs: "column", sm: "row" }}
         borderRadius={4}
         p={4}
         mt={8}
         height={"50%"}
         width={{ xs: "100%", sm: "80%", lg: "70%" }}
         sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            minHeight: "180px",
         }}
      >
         <Box
            display="flex"
            alignItems="center"
            width="100%"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
         >
            {/* Left: Loader */}
            <Box flex={1} display="flex" justifyContent="center">
               <RingLoader color="#ECC851" size={80} />
            </Box>

            {/* Right: Messages */}
            <Box flex={2} pl={4}>
               <Typography
                  variant="h6"
                  fontWeight={500}
                  sx={{
                     color: "#E6EAEA",
                     textAlign: { xs: "center", sm: "unset" },
                  }}
               >
                  Please wait...
               </Typography>
               <Typography
                  variant="body1"
                  mt={1}
                  sx={{
                     color: "#52F064",
                     fontSize: "22px",
                     animation: "pulseText 1.5s infinite",
                     textAlign: { xs: "center", sm: "unset" },
                     "@keyframes pulseText": {
                        "0%": { opacity: 0.4 },
                        "50%": { opacity: 1 },
                        "100%": { opacity: 0.4 },
                     },
                  }}
               >
                  {isEmbeddingLoading
                     ? "Analyzing Files..."
                     : isReportLoading
                     ? "Preparing Report..."
                     : ""}
               </Typography>
               <Typography
                  fontWeight={400}
                  sx={{
                     color: "#E6EAEA",
                     fontSize: "14px",
                     mt: 2,
                     textAlign: { xs: "center", sm: "unset" },
                  }}
               >
                  The Analysis and Report Generation can take up to 3-5 minutes
               </Typography>
            </Box>
         </Box>
      </Box>
   );
};

export default CustomLoader;
