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
import Toast from "../../../../Toast";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../Repo/Repository";
import { useDispatch, useSelector } from "react-redux";
import { setAnalysisReport } from "../../analysisSlice";
import { RingLoader } from "react-spinners";
import { getUser } from "../../../userSlice";

export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
});

const OpenInsightAnalysis = ({
   smallHeightLaptop,
   setSelectedType,
   handleNext,
}) => {
   const dispatch = useDispatch();
   const { uploadedFileRes } = useSelector((state) => state.analysis);
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
   const [query, setQuery] = useState("");
   const [loading, setLoading] = useState(false);
   const [isEmbeddingLoading, setIsEmbeddingLoading] = useState(false);
   const [isReportLoading, setIsReportLoading] = useState(false);

   const handleRunAnalysis = async () => {
      const email = localStorage.getItem("email");
      if (!email) return Toast("error", "Email not found");

      const s3_urls = uploadedFileRes;
      const saveEmbeddingsPayload = { email, s3_urls };
      const generateReportPayload = {
         email,
         query: query || "Analyse these documents and extract deep insights",
         s3_urls,
      };

      setIsEmbeddingLoading(true);

      try {
         // Step 1: Save Embeddings
         const saveRes = await axios.post(
            `${baseURL}/save-embeddings`,
            saveEmbeddingsPayload
         );

         // Check for file format error in response (only if error message matches exactly)
         if (
            saveRes?.data?.error ===
            "Error reading file(s). Please change file(s) format and try again."
         ) {
            setIsEmbeddingLoading(false);
            setIsReportLoading(false);
            Toast("error", saveRes?.data?.error);
            return; // Stop analysis, do not proceed
         }

         if (saveRes?.data?.message) {
            setIsEmbeddingLoading(false);
            setIsReportLoading(true);
            console.log("Embeddings saved");

            // Step 2: Generate Report
            const reportRes = await axios.post(
               `${baseURL}/generate-openinsight-report`,
               generateReportPayload
            );

            if (
               reportRes?.status === 200 &&
               reportRes?.data?.message === "Report generated successfully!" &&
               reportRes?.data?.url
            ) {
               dispatch(setAnalysisReport(reportRes.data.url));
               dispatch(getUser());
               Toast("success", reportRes.data.message);
               handleNext(); // Navigate to FinalReport
            } else {
               // Step 3: If generate-report fails => delete embeddings
               await axios.post(`${baseURL}/delete-embeddings`, { email });
               Toast("error", "Failed to generate report. Embeddings deleted.");
            }
         } else {
            Toast("error", "Failed to save embeddings");
         }
      } catch (err) {
         console.error("Error in analysis", err);

         // In case generate-report throws error instead of 200
         await axios.post(`${baseURL}/delete-embeddings`, { email });
         Toast("error", "Something went wrong. Embeddings deleted.");
      } finally {
         setIsEmbeddingLoading(false);
         setIsReportLoading(false);
      }
   };

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
                        The Analysis and Report Generation can take upto 3-5
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
               spacing={7} // Replaces gap for vertical layout
               width="100%"
               mt={{ xs: 2, sm: "auto" }}
            >
               <Button
                  variant="contained"
                  onClick={() => setSelectedType(null)}
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
                  }}
               >
                  Previous
               </Button>

               <Button
                  variant="contained"
                  onClick={handleRunAnalysis}
                  disabled={loading}
                  sx={{
                     backgroundColor: "#F0CB52",
                     color: loading ? "#FFFFFF" : "#0A3235",
                     fontFamily: "Poppins",
                     borderRadius: "8px",
                     fontWeight: 600,
                     textTransform: "capitalize",
                     py: 1.75,
                     px: { xs: 3, sm: loading ? 4.5 : 14 },
                     width: { xs: "100%", sm: "auto" },
                     "&:hover": {
                        backgroundColor: "#84F052",
                     },
                     "&.Mui-disabled": {
                        color: "#FFFFFF",
                     },
                  }}
               >
                  Start Analysis
               </Button>
            </Stack>
         )}
      </>
   );
};

export default OpenInsightAnalysis;
