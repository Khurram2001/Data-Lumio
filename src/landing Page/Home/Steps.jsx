import React from "react";
import { Text } from "../Home/index";
import { TextPop } from "../Home/index";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Step1Img from "../../assets/images/step-1.png";
import Step2Img from "../../assets/images/step-2.png";
import Step3Img from "../../assets/images/step-3.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Steps = () => {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const steps = [
      {
         title: "Step 1",
         desc: "Upload your data",
         img: Step1Img,
         bgColor: "#45ACCF",
         justify: { xs: "center", lg: "start" },
         borderRadius: {
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "100px",
            borderBottomRightRadius: "16px",
            borderBottomLeftRadius: "16px",
         },
         reverse: false,
      },
      {
         title: "Step 2",
         desc: "Ask question",
         img: Step2Img,
         bgColor: "#C39951",
         justify: "center",
         borderRadius: "16px",
         reverse: false,
      },
      {
         title: "Step 3",
         desc: "Get visual report",
         img: Step3Img,
         bgColor: "#45CE72",
         justify: { xs: "center", lg: "end" },
         borderRadius: {
            borderTopLeftRadius: "100px",
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
            borderBottomLeftRadius: "16px",
         },
         reverse: true,
      },
   ];

   return (
      <Box sx={{ width: "100%" }}>
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
               Effortless Data Analysis in Just Three Steps
            </Text>
         </Box>

         <Stack
            px={{ xs: "20px", sm: "65px" }}
            direction={"row"}
            gap={6}
            my={7}
            flexWrap={"wrap"}
            justifyContent={{ xs: "center", lg: "space-between" }}
            alignItems={"center"}
         >
            <Box
               sx={{
                  flex: {
                     xs: "1 1 100%",
                     sm: "1 1 45%",
                     md: "1 1 30%",
                  },
                  maxWidth: { xs: "100%", sm: "50%", md: "30%" },
                  py: 3,
                  px: 4,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", lg: "start" },
                  gap: 2,
                  background: "#0F484C",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "100px",
                  borderBottomRightRadius: "16px",
                  borderBottomLeftRadius: "16px",
               }}
            >
               <Box sx={{ background: "#45ACCF", borderRadius: "12px" }}>
                  <img src={Step1Img} alt={""} width={"120px"} />
               </Box>
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     gap: 2,
                     alignItems: { xs: "center", sm: "unset" },
                  }}
               >
                  <TextPop sx={{ fontWeight: 700 }}>Step 1</TextPop>
                  <TextPop sx={{ fontSize: "15px" }}>Upload your data</TextPop>
               </Box>
            </Box>

            <Box
               sx={{
                  flex: {
                     xs: "1 1 100%",
                     sm: "1 1 25%",
                     md: "1 1 10%",
                  },
                  maxWidth: { xs: "100%", sm: "50%", md: "25%", lg: "20%" },
                  py: 4,
                  px: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  background: "#0F484C",
                  borderRadius: "16px",
                  flexDirection: "column",
               }}
            >
               <Box sx={{ background: "#C39951", borderRadius: "12px" }}>
                  <img src={Step2Img} alt={""} width={"120px"} />
               </Box>
               <TextPop sx={{ fontWeight: 700 }}>Step 2</TextPop>
               <TextPop sx={{ fontSize: "15px" }}>Choose analysis type</TextPop>
            </Box>

            <Box
               sx={{
                  flex: {
                     xs: "1 1 100%",
                     sm: "1 1 45%",
                     md: "1 1 30%",
                  },
                  maxWidth: { xs: "100%", sm: "50%", md: "30%" },
                  py: 3,
                  px: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "end" },
                  flexWrap: "wrap-reverse",
                  gap: 3,
                  background: "#0F484C",
                  borderTopRightRadius: "16px",
                  borderTopLeftRadius: "100px",
                  borderBottomRightRadius: "16px",
                  borderBottomLeftRadius: "16px",
               }}
            >
               <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextPop sx={{ fontWeight: 700 }}>Step 3</TextPop>
                  <TextPop sx={{ fontSize: "15px" }}>Get visual report</TextPop>
               </Box>
               <Box sx={{ background: "#45CE72", borderRadius: "12px" }}>
                  <img src={Step3Img} alt={""} width={"120px"} />
               </Box>
            </Box>
         </Stack>
      </Box>
   );
};

export default Steps;
