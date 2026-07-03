import { Box, Button, Stack, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import OpenInsightAnalysis from "./OpenInsight";
import { CheckCircle } from "@mui/icons-material";
import PredefinedAnalysis from "./Predefined";

export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
});

const AnalysisType = ({ smallHeightLaptop, handlePrevious, handleNext }) => {
   const [selectedType, setSelectedType] = useState(null);

   return (
      <Box
         className={`flex flex-col items-center sm:justify-center md:justify-normal gap-3 ${
            smallHeightLaptop ? "sm:gap-4" : "sm:gap-8"
         } sm:px-6 lg:px-14 h-[100vh] overflow-y-auto sm:overflow-y-visible sm:h-full mt-4 sm:mt-0 mr-[-8px] sm:mr-0 pr-2 sm:pr-0 pb-2 sm:pb-0`}
      >
         {!selectedType ? (
            <>
               <Box
                  sx={{
                     background: "#3F5A5C",
                     borderRadius: "16px",
                     px: 2,
                     py: smallHeightLaptop ? 1.4 : 4,
                     display: "flex",

                     flexDirection: "column",
                     gap: smallHeightLaptop ? 1.15 : 1.5,
                  }}
               >
                  <Text sx={{ textAlign: "center", fontWeight: 600 }}>
                     Choose preferred analysis approach
                  </Text>
                  <Text
                     sx={{
                        fontWeight: 400,
                        fontSize: {
                           xs: "14px",
                           sm: smallHeightLaptop ? "15px" : "16px",
                        },
                        textAlign: "center",
                     }}
                  >
                     Start with an 
                     <Text
                        component="span"
                        sx={{ fontWeight: 600, color: "#ECC851" }}
                     >
                        {" "}
                        open insight analysis{" "}
                     </Text>
                     for discovery. Refine your results with a{" "}
                     <Text
                        component="span"
                        sx={{ fontWeight: 600, color: "#ECC851" }}
                     >
                        predefined insight analysis
                     </Text>{" "}
                     to focus on the themes you found most relevant to your
                     needs.
                  </Text>
               </Box>

               <Stack
                  direction={"row"}
                  gap={2}
                  justifyContent={"center"}
                  alignItems={"stretch"} // ensures both stretch to same height
                  flexWrap={{ xs: "wrap", sm: "nowrap" }}
               >
                  {[1, 2].map((item, index) => {
                     const currentType = item === 1 ? "open" : "predefined";
                     const isSelected = selectedType === currentType;

                     return (
                        <Box
                           key={index}
                           sx={{
                              flex: 1,
                              background: "#B9C3C3",
                              borderRadius: "16px",
                              padding: smallHeightLaptop ? 2 : 3,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              minWidth: { xs: "100%", sm: "0" },
                           }}
                        >
                           <Box
                              sx={{
                                 display: "flex",
                                 flexDirection: "column",
                                 gap: 1,
                              }}
                           >
                              <Text
                                 sx={{
                                    color: "#0A3235",
                                    textAlign: "center",
                                    fontWeight: 600,
                                    // fontSize: {
                                    //   xs: "14px",
                                    //   sm: "16px",
                                    // },
                                 }}
                              >
                                 {item === 1
                                    ? "1: Open Insight Analysis"
                                    : "2: Predefined Insight Analysis"}
                              </Text>
                              <Text
                                 sx={{
                                    fontWeight: 400,
                                    color: "#000000A3",
                                    textAlign: "center",
                                 }}
                              >
                                 {item === 1
                                    ? "Themes and pattern emerge naturally. Does not require asking research questions."
                                    : "Requires you to ask a question. Themes and patterns emerge based on your question and any additional macro themes added."}
                              </Text>
                              <Text
                                 sx={{
                                    color: "#0A3235",
                                    fontWeight: 600,
                                    textAlign: "center",
                                 }}
                              >
                                 {item === 1
                                    ? "Best for: Researchers exploring data with an open mind to discover fresh insights."
                                    : "Best for: Researchers with specific themes they want to test."}
                              </Text>
                           </Box>

                           <Box
                              sx={{
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 width: "100%",
                                 mt: smallHeightLaptop ? 1 : 1.5,
                              }}
                           >
                              {currentType === "predefined" ? (
                                 <Button
                                    variant="contained"
                                    onClick={() => setSelectedType(currentType)}
                                    sx={{
                                       background: isSelected
                                          ? "#52F064"
                                          : "#FFFFFFB8",
                                       color: "#0A3235",
                                       borderRadius: "8px",
                                       py: 1,
                                       px: 6,
                                       textTransform: "capitalize",
                                       display: "flex",
                                       alignItems: "center",
                                       justifyContent: "center",
                                       position: "relative",
                                       overflow: "hidden",
                                       minWidth: "140px",
                                       transition: "background 0.3s ease-in",
                                       "&:hover": {
                                          background: "#52F064",
                                       },
                                       "&:hover .check-icon": {
                                          opacity: 1,
                                          transform: "translateX(0)",
                                       },
                                       "&:hover .text-span": {
                                          transform: "translateX(8px)",
                                       },
                                    }}
                                 >
                                    <CheckCircle
                                       className="check-icon"
                                       sx={{
                                          color: "#0A3235",
                                          fontSize: 20,
                                          position: "absolute",
                                          left: 25,
                                          opacity: 0,
                                          transform: "translateX(-10px)",
                                          transition: "all 0.3s ease-in-out",
                                       }}
                                    />
                                    <Box
                                       component="span"
                                       className="text-span"
                                       sx={{
                                          transition:
                                             "transform 0.3s ease-in-out",
                                          transform: "translateX(0)",
                                          fontWeight: 500,
                                          fontFamily: "Poppins",
                                       }}
                                    >
                                       Select
                                    </Box>
                                 </Button>
                              ) : (
                                 <Button
                                    variant="contained"
                                    onClick={() => setSelectedType(currentType)}
                                    sx={{
                                       background: isSelected
                                          ? "#52F064"
                                          : "#FFFFFFB8",
                                       color: "#0A3235",
                                       borderRadius: "8px",
                                       py: 1,
                                       px: 6,
                                       textTransform: "capitalize",
                                       display: "flex",
                                       alignItems: "center",
                                       justifyContent: "center",
                                       position: "relative",
                                       overflow: "hidden",
                                       minWidth: "140px",
                                       transition: "background 0.3s ease-in",
                                       "&:hover": {
                                          background: "#52F064",
                                       },
                                       "&:hover .check-icon": {
                                          opacity: 1,
                                          transform: "translateX(0)",
                                       },
                                       "&:hover .text-span": {
                                          transform: "translateX(8px)",
                                       },
                                    }}
                                 >
                                    <CheckCircle
                                       className="check-icon"
                                       sx={{
                                          color: "#0A3235",
                                          fontSize: 20,
                                          position: "absolute",
                                          left: 25,
                                          opacity: 0,
                                          transform: "translateX(-10px)",
                                          transition: "all 0.3s ease-in-out",
                                       }}
                                    />
                                    <Box
                                       component="span"
                                       className="text-span"
                                       sx={{
                                          transition:
                                             "transform 0.3s ease-in-out",
                                          transform: "translateX(0)",
                                          fontWeight: 500,
                                          fontFamily: "Poppins",
                                       }}
                                    >
                                       Select
                                    </Box>
                                 </Button>
                              )}
                           </Box>
                        </Box>
                     );
                  })}
               </Stack>
            </>
         ) : selectedType === "open" ? (
            <OpenInsightAnalysis
               smallHeightLaptop={smallHeightLaptop}
               setSelectedType={setSelectedType}
               handleNext={handleNext}
            />
         ) : selectedType === "predefined" ? (
            <PredefinedAnalysis
               smallHeightLaptop={smallHeightLaptop}
               setSelectedType={setSelectedType}
               handleNext={handleNext}
            />
         ) : null}

         {selectedType === null ? (
            <Button
               variant="contained"
               onClick={handlePrevious}
               sx={{
                  background: "#D5D5D5",
                  borderRadius: "8px",
                  py: 1.75,
                  px: 12,
                  marginTop: "auto",
                  color: "#0A3235",
                  textTransform: "capitalize",
                  "&:hover": {
                     background: "#F5F5F5",
                  },
                  fontWeight: 500,
               }}
            >
               Previous
            </Button>
         ) : null}
      </Box>
   );
};

export default AnalysisType;
