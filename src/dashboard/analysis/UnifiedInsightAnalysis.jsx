import React, { useState } from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { RingLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Toast from "../../Toast";
import { baseURL } from "../../Repo/Repository";
import { setAnalysisReport } from "../analysis/analysisSlice";
import { getUser } from "../userSlice";
import { MdDeleteForever } from "react-icons/md";
export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
});

const UnifiedInsightAnalysis = ({
   smallHeightLaptop,
   handleNext,
   handlePrevious,
}) => {
   const dispatch = useDispatch();
   const { uploadedFileRes } = useSelector((state) => state.analysis);
   const { user } = useSelector((state) => state.user);

   // States

   const [prompt, setPrompt] = useState("");
   const [methodology, setMethodology] = useState("");
   const [methodologyList, setMethodologyList] = useState([]);

   const [isEmbeddingLoading, setIsEmbeddingLoading] = useState(false);
   const [isReportLoading, setIsReportLoading] = useState(false);
   const [loading, setLoading] = useState(false);

   // Helpers
   const email = localStorage.getItem("email");
   if (!email) {
      Toast("error", "Email not found");
      return null;
   }

   const getMaxFileLimit = (plan) => {
      if (plan?.toLowerCase().includes("pro")) return 10;
      return 5;
   };

   const themeLimit = getMaxFileLimit(user?.plan);

   // --- MAIN HANDLER ---
   const handleRunAnalysis = async () => {
      if (!uploadedFileRes?.length)
         return Toast("error", "No uploaded files found");

      const trimmedPrompt = prompt?.trim();
      const trimmedMethodology = methodology?.trim();

      // CASE 1️⃣ — User gave both prompt & methodology
      if (trimmedPrompt && trimmedMethodology) {
         // await handlePredefinedReport(trimmedPrompt, trimmedMethodology);
         await handlePredefinedReport(
            trimmedPrompt,
            methodologyList.join(", ")
         );
      }
      // CASE 2️⃣ — User left blank (normal open insight)
      else {
         await handleOpenInsightReport(trimmedPrompt);
      }
   };

   // --- CASE 1️⃣ Predefined Insight Flow ---

   const handlePredefinedReport = async (prompt, methodology) => {
      setIsEmbeddingLoading(true);
      setIsReportLoading(true);
      try {
         const saveRes = await axios.post(`${baseURL}/save-embeddings`, {
            email,
            s3_urls: uploadedFileRes,
         });

         if (saveRes?.data?.error) {
            Toast("error", saveRes.data.error);
            return;
         }

         const reportRes = await axios.post(
            `${baseURL}/generate-predefinedinsight-report`,
            {
               email,
               s3_urls: uploadedFileRes,
               themes: [prompt, methodology],
               query: `${prompt} | ${methodology}`,
            }
         );

         if (reportRes?.data?.message && reportRes?.data?.url) {
            Toast("success", reportRes.data.message);
            dispatch(setAnalysisReport(reportRes.data.url));
            dispatch(getUser());
            handleNext();
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

   // --- CASE 2️⃣ Open Insight Flow ---
   const handleOpenInsightReport = async (prompt) => {
      setIsEmbeddingLoading(true);
      const s3_urls = uploadedFileRes;

      try {
         const saveRes = await axios.post(`${baseURL}/save-embeddings`, {
            email,
            s3_urls,
         });

         if (
            saveRes?.data?.error ===
            "Error reading file(s). Please change file(s) format and try again."
         ) {
            setIsEmbeddingLoading(false);
            setIsReportLoading(false);
            Toast("error", saveRes.data.error);
            return;
         }

         if (saveRes?.data?.message) {
            setIsEmbeddingLoading(false);
            setIsReportLoading(true);

            const reportRes = await axios.post(
               `${baseURL}/generate-openinsight-report`,
               {
                  email,
                  query:
                     prompt ||
                     "Analyse these documents and extract deep insights",
                  s3_urls,
               }
            );

            if (
               reportRes?.status === 200 &&
               reportRes?.data?.message === "Report generated successfully!" &&
               reportRes?.data?.url
            ) {
               dispatch(setAnalysisReport(reportRes.data.url));
               dispatch(getUser());
               Toast("success", reportRes.data.message);
               handleNext();
            } else {
               await axios.post(`${baseURL}/delete-embeddings`, { email });
               Toast("error", "Failed to generate report. Embeddings deleted.");
            }
         } else {
            Toast("error", "Failed to save embeddings");
         }
      } catch (err) {
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
                     minutes.
                  </Text>
               </Box>
            </Box>
         ) : (
            <Stack
               direction="column"
               justifyContent="center"
               alignItems="center"
               spacing={4}
               width="100%"
               mt={{ xs: 2, sm: "39px" }}
            >
               <Box
                  sx={{
                     width: "80%",
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
                        textAlign: "start",
                        fontFamily: "Poppins",
                        fontSize: {
                           xs: "14px",
                           sm: smallHeightLaptop ? "15px" : "16px",
                        },
                     }}
                  >
                     Use the "Prompt" and "Themes" input to define clear,
                     focused themes and questions in order to guide the AI
                     towards deeper insights. If you leave the "prompt" and
                     "theme" fields empty, DataLumio will automatically process
                     your data to generate an “Open Insights” report, offering
                     broad exploratory analysis without predefined focus areas.
                  </Text>
               </Box>
               <div className="-mb-9 w-full max-w-[980px] mx-auto">
                  <Box>
                     <Typography fontWeight={500} mb={1}>
                        Prompt
                     </Typography>

                     <textarea
                        value={prompt}
                        onChange={(e) => {
                           const value = e.target.value;
                           if (value.length <= 255) {
                              setPrompt(value);
                           } else {
                              // Still show error even if user tries to type more
                              setPrompt(value.slice(0, 255));
                           }
                        }}
                        placeholder="Type your question here (optional)"
                        className={`w-full border max-w-[980px] bg-[#E6E7E8] text-[#292A30] rounded-md py-2 px-3 outline-none ${
                           prompt.length >= 255
                              ? "border-red-500"
                              : "border-transparent"
                        }`}
                        rows={3}
                     />

                     {/* Character counter */}
                     <Typography
                        variant="body2"
                        sx={{
                           textAlign: "right",
                           mt: 0.5,
                           color: prompt.length > 255 ? "red" : "#666",
                           fontSize: "13px",
                        }}
                     >
                        {prompt.length} / 255 characters
                     </Typography>

                     {/* Error message when limit reached */}
                     {prompt.length >= 255 && (
                        <Typography
                           variant="body2"
                           sx={{
                              color: "red",
                              fontSize: "13px",
                              mb: 1,
                              mt: -3,
                           }}
                        >
                           Character limit reached! You cannot type more than
                           255 characters.
                        </Typography>
                     )}
                  </Box>

                  <Box>
                     <Typography fontWeight={500} color="#E6E7E8" mb={1}>
                        Themes
                     </Typography>
                     {/* Input field for adding methodology */}
                     <div className="relative w-full">
                        <input
                           value={methodology}
                           onChange={(e) => setMethodology(e.target.value)}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                 e.preventDefault();
                                 const trimmed = methodology.trim();
                                 if (trimmed) {
                                    setMethodologyList((prev) => [
                                       ...prev,
                                       trimmed,
                                    ]);
                                    setMethodology("");
                                 }
                              }
                           }}
                           placeholder="Name your theme here (optional) e.g. “Limitations” or “Methodology”"
                           className="w-full text-[#292A30] bg-[#E6E7E8] border rounded-md py-4 px-4 pr-24 outline-none"
                        />

                        {/* Add Button Inside Input */}

                        <button
                           onClick={() => {
                              const trimmed = methodology.trim();
                              if (trimmed) {
                                 setMethodologyList((prev) => [
                                    ...prev,
                                    trimmed,
                                 ]);
                                 setMethodology("");
                              }
                           }}
                           disabled={!methodology.trim()}
                           className={`absolute right-2 top-1/2 -translate-y-1/2 font-semibold px-4 py-2 rounded-md text-sm transition-all duration-200 shadow-sm
         ${
            methodology.trim()
               ? "bg-[#F0CB52] hover:bg-[#84F052] text-[#0A3235] cursor-pointer"
               : "bg-gray-300 text-gray-600 cursor-not-allowed"
         }`}
                        >
                           Add
                        </button>
                     </div>

                     {/* Methodology list display */}
                     {methodologyList.length > 0 && (
                        <div className="bg-[#FFFFFF] rounded-[12px] mt-4 pb-2">
                           {/* Header inside white box */}
                           <div className="flex justify-between items-center border-b px-4 py-2">
                              <Typography
                                 fontWeight={500}
                                 fontSize="14px"
                                 color="#063436"
                                 sx={{ opacity: 0.9 }}
                              >
                                 {methodologyList.length
                                    .toString()
                                    .padStart(2, "0")}{" "}
                                 Macro
                                 {methodologyList.length === 1
                                    ? " theme"
                                    : " themes"}{" "}
                                 added
                              </Typography>
                           </div>

                           {/* Themes List */}
                           {methodologyList.map((item, index) => (
                              <div
                                 key={index}
                                 className="flex items-center justify-between px-4 py-2 border-b last:border-none"
                              >
                                 <Typography
                                    sx={{
                                       fontSize: "15px",
                                       color: "#063436",
                                       fontWeight: 400,
                                       wordBreak: "break-word",
                                    }}
                                 >
                                    {item}
                                 </Typography>
                                 <button
                                    onClick={() =>
                                       setMethodologyList((prev) =>
                                          prev.filter((_, i) => i !== index)
                                       )
                                    }
                                    className="text-gray-500 p-2 rounded-[4px] text-[19px] cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
                                 >
                                    <MdDeleteForever />
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}
                  </Box>
               </div>

               {/* Action Buttons */}
               <Stack direction="row" spacing={3} mt={3}>
                  <Button
                     variant="contained"
                     onClick={handlePrevious}
                     sx={{
                        background: "#D5D5D5",
                        borderRadius: "8px",
                        py: 1.5,
                        px: 6,
                        color: "#0A3235",
                        textTransform: "capitalize",
                        "&:hover": { background: "#F5F5F5" },
                        fontWeight: 500,
                     }}
                  >
                     Previous
                  </Button>

                  <Button
                     variant="contained"
                     onClick={handleRunAnalysis}
                     disabled={isEmbeddingLoading || isReportLoading}
                     sx={{
                        backgroundColor: "#F0CB52",
                        color: loading ? "#FFFFFF" : "#0A3235",
                        borderRadius: "8px",
                        fontWeight: 600,
                        textTransform: "capitalize",
                        py: 1.5,
                        px: 8,
                        "&:hover": { backgroundColor: "#84F052" },
                     }}
                  >
                     {isEmbeddingLoading || isReportLoading
                        ? "Generating..."
                        : "Start Analysis"}
                  </Button>
               </Stack>
            </Stack>
         )}
      </>
   );
};

export default UnifiedInsightAnalysis;
