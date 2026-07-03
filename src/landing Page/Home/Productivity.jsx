import React from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { Text } from "../Home/index";
import { TextPop } from "../Home/index";
import DataTypeImg from "../../assets/images/data-type-img.png";
import DataTypeMobImg from "../../assets/images/data-type-img-mob.png";
import DataTypeIcon from "../../assets/images/data-type-icon.png";
import VisualImg from "../../assets/images/visual-img.png";
import VisualImgMob from "../../assets/images/visual-img-mob.png";
import VisualIcon from "../../assets/images/visual-icon.png";
import ResearchImg from "../../assets/images/research-ready-img.png";
import ResearchImgMob from "../../assets/images/research-ready-img-mob.png";
import ResearchIcon from "../../assets/images/research-ready-icon.png";
import UserFriendlyImg from "../../assets/images/user-friendly-img.png";
import UserFriendlyImgMob from "../../assets/images/user-friendly-img-mob.png";
import UserFriendlyIcon from "../../assets/images/user-friendly-icon.png";
import Comparison from "./Comparison";

const Productivity = () => {
   const isMobile = useMediaQuery("(max-width:600px)");
   const isSmall = useMediaQuery("(max-width:900px)");
   const isLargeDevice = useMediaQuery(
      "(min-width:1000px) and (min-height:650px)"
   );

   const boxData = [
      {
         title: "Works with Any Data Type",
         description:
            "Analyze both qualitative (text) and quantitative (numeric) data effortlessly.",
         leftImg: isSmall ? DataTypeMobImg : DataTypeImg,
         rightImg: DataTypeIcon,
         variant: "A",
      },
      {
         title: "Instant Visual Reports",
         description:
            "Get beautifully designed charts, tables, and summaries in seconds.",
         leftImg: VisualIcon,
         rightImg: isSmall ? VisualImgMob : VisualImg,
         variant: "B",
      },
      {
         title: "Research-Ready Output",
         description:
            "Export findings that are clear, structured, and ready to publish or present.",
         leftImg: isSmall ? ResearchImgMob : ResearchImg,
         rightImg: ResearchIcon,
         variant: "A",
      },
      {
         title: "User-friendly Interface",
         description:
            "Designed for researchers, not developers—intuitive and easy to use.",
         leftImg: UserFriendlyIcon,
         rightImg: isSmall ? UserFriendlyImgMob : UserFriendlyImg,
         variant: "B",
      },
   ];

   return (
      <>
         <main>
            <Box
               sx={{
                  background: "#B6F0C2",
                  pt: 8,
                  pb: 10,
                  px: 4,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 2,
               }}
            >
               <Text
                  variant="h2"
                  sx={{ fontSize: "24px", fontWeight: 700, color: "#0B3235" }}
               >
                  Boost Your Research Productivity with DataLumio
               </Text>

               <TextPop
                  sx={{ fontSize: "18px", fontWeight: 500, color: "#0A3134" }}
               >
                  Save time, reduce manual effort, and focus on insights—not
                  spreadsheets.
               </TextPop>

               <Stack
                  direction={"column"}
                  gap={3}
                  mt={4}
                  width={{ xs: "100%", sm: "70%" }}
               >
                  {boxData.map((item, index) => (
                     <Box
                        key={index}
                        sx={{
                           display: "flex",
                           justifyContent: {
                              xs: "center",
                              lg: "space-between",
                           },
                           flexWrap:
                              item.variant === "A"
                                 ? "wrap"
                                 : { xs: "wrap-reverse", lg: "wrap" },
                           alignItems: "center",
                           gap: 3,
                           background: "#FFFFFF",
                           borderRadius: "32px",
                           maxHeight: { lg: "220px" },
                           overflow: "hidden",
                        }}
                     >
                        <Box
                           sx={{
                              display: "flex",
                              gap: isLargeDevice
                                 ? item.variant === "A"
                                    ? 11
                                    : 22
                                 : item.variant === "A"
                                 ? 6
                                 : { xs: 4, sm: 17 },

                              alignItems: "center",
                              flexWrap:
                                 item.variant === "A" ? "wrap" : "wrap-reverse",
                              justifyContent: { xs: "center", lg: "unset" },
                           }}
                        >
                           <Box
                              sx={{
                                 maxWidth:
                                    item.variant === "A"
                                       ? { xs: "100%", sm: "250px" }
                                       : "130px",
                                 ...(item.variant === "A"
                                    ? { mt: -1.5 }
                                    : { ml: { xs: 0, md: 4 } }),
                              }}
                           >
                              <img
                                 src={item.leftImg}
                                 alt=""
                                 style={{
                                    maxWidth: isMobile ? "103%" : "auto",
                                 }}
                              />
                           </Box>

                           {/* ✅ Text Center-Aligned */}
                           <Box
                              sx={{
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 flexDirection: "column",
                                 gap: 3,
                                 textAlign: "center",
                              }}
                           >
                              <Text
                                 variant="h3"
                                 sx={{
                                    color: "#0B3235",
                                    fontWeight: 700,
                                    fontSize: "24px",
                                 }}
                              >
                                 {item.title}
                              </Text>
                              <TextPop
                                 sx={{
                                    color: "#0A3134",
                                    fontWeight: 500,
                                    maxWidth: "280px",
                                 }}
                              >
                                 {item.description}
                              </TextPop>
                           </Box>
                        </Box>

                        {/* Right Image Box */}
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: { xs: "center", lg: "flex-end" },
                              width: "100%",
                              maxWidth:
                                 item.variant === "A"
                                    ? "130px"
                                    : { xs: "100%", sm: "250px" },
                              ...(item.variant === "A"
                                 ? { mr: { lg: 5 } }
                                 : { mt: -1.5, ml: { lg: "auto" } }),
                           }}
                        >
                           <img
                              src={item.rightImg}
                              alt=""
                              style={{ maxWidth: isMobile ? "106%" : "auto" }}
                           />
                        </Box>
                     </Box>
                  ))}
               </Stack>
            </Box>
            <Comparison />
         </main>
      </>
   );
};

export default Productivity;
