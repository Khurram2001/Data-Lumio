import React, { useState } from "react";
import { Box, TextField, Button, Stack, useMediaQuery } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import { RingLoader } from 'react-spinners';

export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
});

const AddTheme = ({
   smallHeightLaptop,
   inputValue,
   setInputValue,
   themes,
   setThemes,
   handleNext,
   handleBack,
   themeLimit,
   question,
   setQuestion,
   loading,
}) => {
   const isMobile = useMediaQuery("(max-width:600px)");
   const isTab = useMediaQuery("(max-width:1000px)");
   const [step, setStep] = useState(1);

   const handleAddTheme = () => {
      if (themes.length >= themeLimit) return;
      if (inputValue.trim()) {
         setThemes((prev) => [...prev, { name: inputValue.trim() }]);
         setInputValue("");
      }
   };

   const handleNextStep = () => {
      setStep(2);
   };

   if (step === 2) {
      if (loading) {
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
                     <Text
                        variant="h6"
                        fontWeight={500}
                        sx={{
                           color: "#E6EAEA",
                           textAlign: { xs: "center", sm: "unset" },
                        }}
                     >
                        Please wait...
                     </Text>
                     <Text
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
                        Analysis in progress...
                     </Text>
                     <Text
                        fontWeight={400}
                        sx={{
                           color: "#E6EAEA",
                           fontSize: "14px",
                           mt: 2,
                           textAlign: { xs: "center", sm: "unset" },
                        }}
                     >
                        The Analysis and Report Generation can take up to 3–5 minutes
                     </Text>
                  </Box>
               </Box>
            </Box>
         );
      }
      return (
         <Box sx={{ width: '100%', mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
            <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
               <Button
                  variant="contained"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  sx={{
                     background: "#D5D5D5",
                     borderRadius: "8px",
                     py: 1.75,
                     px: 8,
                     color: "#0A3235",
                     textTransform: "capitalize",
                     fontWeight: 500,
                     '&:hover': { background: '#F5F5F5' },
                  }}
               >
                  Previous
               </Button>
               <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={loading}
                  sx={{
                     backgroundColor: "#F0CB52",
                     color: "#0A3235",
                     fontFamily: "Poppins",
                     borderRadius: "8px",
                     fontWeight: 600,
                     textTransform: "capitalize",
                     py: 1.75,
                     px: 8,
                     '&:hover': { backgroundColor: '#84F052' },
                  }}
               >
                  Run Analysis
               </Button>
            </Stack>
         </Box>
      );
   }

   const handleDelete = (index) => {
      setThemes((prev) => prev.filter((_, i) => i !== index));
   };

   const textFieldStyles = {
      backgroundColor: "#E6E7E8",
      borderRadius: "8px",
      padding: smallHeightLaptop ? "0px" : "4px 0px",
      input: {
         fontFamily: "Poppins",
         color: "#292A30",
         "::placeholder": {
            color: "#818181",
            opacity: 1,
            fontFamily: "Poppins",
            fontSize: isMobile ? "14px" : "15px",
         },
      },
      "& .MuiOutlinedInput-root": {
         "& fieldset": {
            borderColor: "#E6E7E8",
         },
         "&:hover fieldset": {
            borderColor: "#E6E7E8",
         },
         "&.Mui-focused fieldset": {
            borderColor: "#E6E7E8",
         },
      },
   };

   return (
      <>
         <Box
            sx={{
               width: "100%",
               background: "#3F5A5C",
               borderRadius: "8px",
               px: { xs: 1.5, sm: 4 },
               py: { xs: 1.5, sm: smallHeightLaptop ? 2.5 : 3 },
               display: "flex",
               flexDirection: "column",
            }}
         >
            <Text
               sx={{
                  color: "#fff",
                  fontWeight: 400,
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: {
                     xs: "14px",
                     sm: smallHeightLaptop ? "15px" : "16px",
                  },
               }}
            >
               Define clear, focused themes and questions to guide the AI toward
               deeper insights, not just descriptions.
            </Text>
         </Box>
         <TextField
            fullWidth
            placeholder="Type your question here"
            multiline
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={textFieldStyles}
            InputProps={{
               style: {
                  fontFamily: "Poppins",
                  color: "#292A30",
               },
            }}
            disabled={loading}
         />
         {/* Input Box */}
         <Box
            sx={{
               background: "#E6E7E8",
               borderRadius: "8px",
               px: 1,
               py: 0.75,
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               mt: 1,
               width: "100%",
               gap: 1,
            }}
         >
            <TextField
               fullWidth
               placeholder="Name your theme here e.g “Limitations” or “Methodology”"
               variant="outlined"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     e.preventDefault(); // prevent form submit if inside a form
                     handleAddTheme();
                  }
               }}
               sx={textFieldStyles}
            />

            <Stack
               direction={"row"}
               gap={1}
               alignItems={"center"}
               justifyContent={"center"}
            >
               {!isMobile || !isTab ? (
                  <Text
                     sx={{
                        fontSize: "14px",
                        color: "#0A3235",
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                     }}
                  >
                     Press Enter or
                  </Text>
               ) : null}
               <Button
                  onClick={handleAddTheme}
                  disabled={themes.length >= themeLimit || loading}
                  sx={{
                     background: "#F0CB52",
                     borderRadius: "8px",
                     color: "#0A3235",
                     textTransform: "none",
                     px: 3.5,
                     fontFamily: "Poppins",
                     fontWeight: 500,
                     fontSize: "15px",
                     ":hover": {
                        background: "#84F052",
                     },
                  }}
               >
                  Add
               </Button>
            </Stack>
         </Box>

         {/* Themes Box */}

         {themes.length > 0 && (
            <Box
               sx={{
                  width: "100%",
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  height: "148px",
                  flexDirection: "column",
                  mt: 2,
                  mb: 1,
               }}
            >
               <Box
                  sx={{
                     background: "#F5F5F5",
                     px: 0,
                     py: { xs: 1, sm: 1.5, md: 2 },
                     flexShrink: 0,
                     overflowX: "auto",
                  }}
               >
                  <Box sx={{ minWidth: "500px", px: 3 }}>
                     <Stack
                        direction={"row"}
                        justifyContent={{ xs: "start", sm: "space-between" }}
                        gap={4}
                        alignItems={"center"}
                        sx={{ height: "100%" }}
                     >
                        <Text
                           sx={{
                              fontWeight: 500,
                              color: "#0A3235",
                              fontSize: { xs: "15px", sm: "16px" },
                              whiteSpace: "nowrap",
                           }}
                        >
                           Macro Themes
                        </Text>
                        <Text
                           sx={{
                              fontWeight: 400,
                              color: "#0A3235",
                              fontSize: { xs: "15px", sm: "16px" },
                              whiteSpace: "nowrap",
                           }}
                        >
                           {themes.length < 10
                              ? `0${themes.length}`
                              : themes.length}{" "}
                           Macro theme{themes.length !== 1 ? "s" : ""} added
                        </Text>
                     </Stack>
                  </Box>
               </Box>

               <Box
                  sx={{
                     overflowY: "auto",
                     background: "#FFFFFF",
                     pt: 0.25,
                     "&::-webkit-scrollbar": {
                        width: "8px",
                     },
                     "&::-webkit-scrollbar-track": {
                        background: "#FFFFFF",
                     },
                     "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#C0C0C0",
                        borderRadius: "4px",
                     },
                  }}
               >
                  {themes.map((theme, index) => (
                     <Box
                        key={index}
                        className="flex items-center justify-between py-2 px-6 bg-white"
                     >
                        <Text
                           sx={{
                              color: "#0A3235",
                              fontSize: { xs: "15px", sm: "16px" },
                           }}
                        >
                           {theme.name}
                        </Text>
                        <DeleteForeverIcon
                           onClick={() => handleDelete(index)}
                           sx={{
                              color: "#909090",
                              borderRadius: "4px",
                              px: 0.5,
                              fontSize: { xs: "34px", sm: "28px" },
                              cursor: "pointer",
                              "&:hover": {
                                 background: "#DC393B",
                                 color: "#FFFFFF",
                              },
                           }}
                        />
                     </Box>
                  ))}
               </Box>
            </Box>
         )}

         {themes.length >= themeLimit && (
            <Text
               sx={{
                  color: "#F05255",
                  fontWeight: 500,
                  mt: 1,
                  textAlign: "center",
               }}
            >
               You have reached your micro theme limit ({themeLimit}).
            </Text>
         )}

         <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            gap={2}
            mt={3}
         >
            <Button
               variant="contained"
               onClick={handleBack}
               disabled={loading}
               sx={{
                  background: "#D5D5D5",
                  borderRadius: "8px",
                  py: 1.75,
                  px: 8,
                  color: "#0A3235",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  '&:hover': { background: '#F5F5F5' },
               }}
            >
               Previous
            </Button>
            <Button
               variant="contained"
               onClick={handleNextStep}
               disabled={loading}
               sx={{
                  backgroundColor: "#F0CB52",
                  color: "#0A3235",
                  fontFamily: "Poppins",
                  borderRadius: "8px",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  py: 1.75,
                  px: 8,
                  '&:hover': { backgroundColor: '#84F052' },
               }}
            >
               Next Step
            </Button>
         </Stack>
      </>
   );
};

export default AddTheme;
