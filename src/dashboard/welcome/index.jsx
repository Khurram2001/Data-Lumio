import { Box, Button, styled, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetStep } from "../analysis/analysisSlice";

export const TextSpace = styled(Typography)({
   fontFamily: "'Space Grotesk', sans-serif",
   fontWeight: 400,
});
export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
   fontWeight: 400,
});

const Welcome = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const smallHeightLaptop = useMediaQuery(
      "(max-height:700px) and (min-width:600px)"
   );

   const steps = [
      {
         title: "Step 1",
         description: "Prepare and upload your files in PDF or DOC format.",
      },
      {
         title: "Step 2",
         description: "Choose analysis type & ask your research question.",
      },
      {
         title: "Step 3",
         description: "Wait for few minutes, view & download your report.",
      },
   ];

   return (
      <div
         className={`py-4 px-2 sm:py-4 sm:px-2 ${
            smallHeightLaptop ? "xl:py-5" : "xl:py-3"
         } xl:px-2 flex flex-col items-center justify-center lg:items-center "lg:justify-center"
       gap-4 mt-4 sm:mt-0 h-[92vh] ${
          smallHeightLaptop ? "sm:gap-10" : "sm:gap-16"
       } sm:h-[95vh] ${
            smallHeightLaptop ? "lg:h-[95vh]" : "lg:h-[88vh]"
         } overflow-y-auto`}
      >
         <TextSpace
            sx={{
               color: "#F0CB52",
               fontWeight: 700,
               fontSize: {
                  xs: "28px",
                  sm: smallHeightLaptop ? "30px" : "34px",
                  width: "100%",
                  textAlign: "center",
               },
            }}
         >
            Welcome to DataLumio!
         </TextSpace>
         <Text
            sx={{
               color: "#FFFFFF",
               fontWeight: 400,
               fontSize: {
                  xs: "16px",
                  sm: smallHeightLaptop ? "18px" : "20px",
                  width: "100%",
                  textAlign: "center",
               },
            }}
         >
            Analyze your documents effortlessly with DataLumio – precise
            insights in just a few clicks.
         </Text>
         <Box
            sx={{
               width: "100%",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               flexWrap: "wrap",
               gap: { xs: 3, lg: smallHeightLaptop ? 5 : 6 },
            }}
         >
            {steps.map((step, index) => (
               <Box
                  key={index}
                  sx={{
                     p: 2,
                     background: "white",
                     border: "1px solid #F0F0F0",
                     borderRadius: "16px",
                     display: "flex",
                     flexDirection: "column",
                     gap: 1,
                     width: {
                        xs: "100%",
                        sm: "250px",
                        lg: smallHeightLaptop ? "240px" : "220px",
                     },
                     minHeight: {
                        sm: smallHeightLaptop ? "110px" : "140px",
                        lg: smallHeightLaptop ? "110px" : "120px",
                     },
                  }}
               >
                  <Text
                     sx={{
                        color: "#0A3235",
                        fontWeight: 600,
                        fontSize: {
                           xs: "14px",
                           sm: smallHeightLaptop ? "16px" : "18px",
                        },
                     }}
                  >
                     {step.title}
                  </Text>
                  <Text
                     sx={{
                        color: "#000000",
                        fontWeight: 400,
                        fontSize: {
                           xs: "12px",
                           sm: smallHeightLaptop ? "14px" : "16px",
                        },
                     }}
                  >
                     {step.description}
                  </Text>
               </Box>
            ))}
         </Box>
         <Button
            variant="contained"
            onClick={() => {
               dispatch(resetStep());
               //  navigate("/analysis");
               navigate("/step-analysis");
            }}
            sx={{
               padding: { xs: "7px 30px", sm: "14px 120px" },
               background: "#F0CB52",
               borderRadius: "8px",
               color: "#0A3235",
               my: { xs: 1, sm: 2 },
               fontWeight: 600,
               fontFamily: "'Poppins', sans-serif",
               textTransform: "capitalize",
               "&:hover": { background: "#84F052" },
            }}
         >
            Continue
         </Button>
      </div>
   );
};

export default Welcome;
