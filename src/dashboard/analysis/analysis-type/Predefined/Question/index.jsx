import {
   Box,
   Button,
   Stack,
   Typography,
   TextField,
   styled,
   CircularProgress,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import axios from "axios";
import { baseURL } from "../../../../../Repo/Repository";
import Toast from "../../../../../Toast";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RingLoader } from "react-spinners";
import { setAnalysisReport } from "../../../analysisSlice";

export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
});

const AskQuestion = ({
   smallHeightLaptop,
   handleBack,
   themes = [],
   email,
   handleNext,
}) => {
   const [query, setQuery] = useState("");

   const [step, setStep] = useState(1);
   const [isEmbeddingLoading, setIsEmbeddingLoading] = useState(false);
   const [isReportLoading, setIsReportLoading] = useState(false);
   const uploadedFileRes = useSelector(
      (state) => state.analysis.uploadedFileRes
   );
   const dispatch = useDispatch();

   const textFieldStyles = {
      backgroundColor: "#E6E7E8",
      borderRadius: "8px",
      padding: smallHeightLaptop ? "0px" : "4px 0px",
      input: {
         fontFamily: "Poppins",
         color: "#292A30",
         "::placeholder": {
            color: "#292A30",
            opacity: 1,
            fontFamily: "Poppins",
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

   const handleRunAnalysis = async () => {
      if (!email) return Toast("error", "Email not found");
      if (!uploadedFileRes.length)
         return Toast("error", "No uploaded file found");
      if (!themes.length)
         return Toast("error", "Please add at least one theme");

      setIsEmbeddingLoading(true);
      try {
         const saveRes = await axios.post(`${baseURL}/save-embeddings`, {
            email,
            s3_urls: uploadedFileRes,
         });

         if (saveRes?.data?.error) {
            Toast("error", saveRes.data.error);
            setIsEmbeddingLoading(false);
            setIsReportLoading(false);
            return;
         }

         setIsEmbeddingLoading(false);
         setIsReportLoading(true);

         const themeNames = themes.map((t) => t.name || t);
         const reportRes = await axios.post(
            `${baseURL}/generate-predefinedinsight-report`,
            {
               email,
               s3_urls: uploadedFileRes,
               themes: themeNames,
               query:
                  query || "Analyse these documents and extract deep insights",
            }
         );

         if (reportRes?.data?.message && reportRes?.data?.url) {
            Toast("success", reportRes.data.message);
            dispatch(setAnalysisReport(reportRes.data.url));
            if (typeof handleNext === "function") {
               handleNext();
            } else {
               console.error("handleNext is not defined or not a function");
            }
         } else {
            Toast(
               "error",
               reportRes?.data?.error || "Failed to generate report"
            );
         }
      } catch (err) {
         Toast("error", err?.response?.data?.error || "Something went wrong");
      } finally {
         setIsEmbeddingLoading(false);
         setIsReportLoading(false);
      }
   };

   // Step 1: Only Input Field and Buttons
   if (step === 1) {
      return (
         <>
            {/* Instructional UI commented out */}
            {/* <Box>...</Box> */}
            {/* <Stack>Recommended/Not Recommended</Stack> */}

            <TextField
               fullWidth
               placeholder="Type your question here (optional)"
               multiline
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               sx={textFieldStyles}
               InputProps={{
                  style: {
                     fontFamily: "Poppins",
                     color: "#292A30",
                  },
               }}
            />

            <Stack
               direction={"row"}
               justifyContent={"space-between"}
               flexWrap={"wrap"}
               width={"100%"}
               gap={2}
               mt={{ xs: 2, sm: "auto" }}
            >
               <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{
                     background: "#D5D5D5",
                     borderRadius: "8px",
                     py: 1.75,
                     px: 12,
                     width: { xs: "100%", sm: "auto" },
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
               <Button
                  variant="contained"
                  onClick={() => setStep(2)}
                  sx={{
                     backgroundColor: "#F0CB52",
                     color: "#0A3235",
                     fontFamily: "Poppins",
                     borderRadius: "8px",
                     fontWeight: 600,
                     textTransform: "capitalize",
                     py: 1.75,
                     px: 12,
                     width: { xs: "100%", sm: "auto" },
                     alignSelf: "center",
                     "&:hover": {
                        backgroundColor: "#84F052",
                     },
                  }}
               >
                  Next
               </Button>
            </Stack>
         </>
      );
   }

   // Step 2: Loader or Start Analysis
   return (
      <>
         {isEmbeddingLoading || isReportLoading ? (
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
                  <Box flex={1} display="flex" justifyContent="center">
                     <RingLoader color="#ECC851" size={80} />
                  </Box>
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
                        {isEmbeddingLoading
                           ? "Analyzing Files..."
                           : isReportLoading
                           ? "Preparing Report..."
                           : ""}
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
                        The Analysis and Report Generation can take up to 3–5
                        minutes
                     </Text>
                  </Box>
               </Box>
            </Box>
         ) : (
            <Stack
               direction="column"
               justifyContent="center"
               alignItems="center"
               height={"100%"}
               spacing={7}
               width="100%"
               mt={{ xs: 2, sm: "auto" }}
            >
               <Stack
                  direction="column"
                  spacing={2}
                  width="100%"
                  alignItems="center"
               >
                  <Button
                     variant="contained"
                     onClick={handleRunAnalysis}
                     disabled={isEmbeddingLoading || isReportLoading}
                     sx={{
                        backgroundColor: "#F0CB52",
                        color:
                           isEmbeddingLoading || isReportLoading
                              ? "#FFFFFF"
                              : "#0A3235",
                        fontFamily: "Poppins",
                        borderRadius: "8px",
                        fontWeight: 600,
                        textTransform: "capitalize",
                        py: 1.75,
                        px: { xs: 3, sm: 14 },
                        width: { xs: "100%", sm: "auto" },
                        alignSelf: "center",
                        "&:hover": {
                           backgroundColor: "#84F052",
                        },
                        "&.Mui-disabled": {
                           color: "#FFFFFF",
                        },
                     }}
                  >
                     {isEmbeddingLoading || isReportLoading ? (
                        <CircularProgress
                           size={20}
                           sx={{ color: "#FFFFFF", marginRight: 1 }}
                        />
                     ) : null}
                     {isEmbeddingLoading || isReportLoading
                        ? "Running..."
                        : "Start Analysis"}
                  </Button>
                  <Button
                     variant="contained"
                     onClick={() => setStep(1)}
                     sx={{
                        background: "#D5D5D5",
                        borderRadius: "8px",
                        py: 1.75,
                        px: 17,
                        width: { xs: "100%", sm: "auto" },
                        color: "#0A3235",
                        textTransform: "capitalize",
                        "&:hover": {
                           background: "#F5F5F5",
                        },
                        fontWeight: 500,
                        mt: 1,
                     }}
                  >
                     Previous
                  </Button>
               </Stack>
            </Stack>
         )}
      </>
   );
};

export default AskQuestion;
