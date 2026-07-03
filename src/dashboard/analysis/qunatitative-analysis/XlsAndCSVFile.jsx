import { Box, Typography, Stack, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudUpload from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setActiveStep } from "../analysisSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import CustomLoader from "./CustomLoader";
import FinalQuantitativeReport from "./FinalQuantitativeReport";
import QuantitativeInsightAnalysis from "./QuantitativeInsightAnalysis";
import PromptTheme from "./PromptTheme";

const XlsAndCSVFile = ({
   smallHeightLaptop,
   isMobile,
   isTab,
   handleDrop,
   handleDragOver,
   handleFileUpload,
   removeFile,
   loading,
   disableNext,
}) => {
   const dispatch = useDispatch();
   const { uploadedFiles, activeStep } = useSelector((state) => state.analysis);
   const { user } = useSelector((state) => state.user);
   const [analysisDone, setAnalysisDone] = useState(false);
   const [downloadUrl, setDownloadUrl] = useState(null);
   const [step, setStep] = useState(1);
   const [analysisLoading, setAnalysisLoading] = useState(false);
   const [uploadedUrls, setUploadedUrls] = useState([]);
   const [fileUrl, setFileUrl] = useState(null);
   const [finalReportUrl, setFinalReportUrl] = useState(null);
   const [prompt, setPrompt] = useState("");
   const [uploading, setUploading] = useState(false);
   const getMaxFileLimit = (plan) => {
      if (plan?.toLowerCase().includes("pro")) return 10;
      return 5;
   };
   const maxLimit = getMaxFileLimit(user?.plan);
   const planName = user?.plan
      ? `${user.plan.charAt(0).toUpperCase()}${user.plan.slice(1)}`
      : "Starter";
   const handleFileUploadWithToast = async (e) => {
      const files = e.target.files;
      if (files.length === 0) return;

      if (uploadedFiles.length + files.length > maxLimit) {
         toast.error(
            `You can only upload up to ${maxLimit} files in ${planName} plan`
         );
         return;
      }

      const invalidFiles = Array.from(files).filter(
         (file) =>
            !file.name.toLowerCase().endsWith(".xlsx") &&
            !file.name.toLowerCase().endsWith(".csv")
      );

      if (invalidFiles.length > 0) {
         toast.error("Only XLSX and CSV files are allowed");
         return;
      }

      try {
         setUploading(true); // 👈 Loader on
         const email = localStorage.getItem("email");
         if (!email) {
            toast.error("Please Login First!");
            return;
         }

         const formData = new FormData();
         formData.append("email", email);
         Array.from(files).forEach((file) => {
            formData.append("files", file);
         });

         const response = await axios.post(
            "https://api.urhja.com/upload",
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            }
         );

         // 🔹 yahan credits error handle karna hai
         if (response.data?.error) {
            toast.error(response.data.error); // 👈 show error
            setDisableNext(true); // 👈 Next Step disable
            return; // stop further process
         }

         if (response.data?.message) {
            toast.success(response.data.message);
         }

         if (response.data?.uploaded_files) {
            setUploadedUrls(response.data.uploaded_files);
         }

         await handleFileUpload(e);
      } catch (error) {
         console.error("Upload error:", error);
      } finally {
         setUploading(false); // 👈 Loader off
      }
   };
   const handleRemoveFileWithToast = (index) => {
      const fileName = uploadedFiles[index].name;
      removeFile(index);
      toast.info(`Removed file: ${fileName}`);
   };
   // 🔹 Start Analysis
   const handleStartAnalysis = async () => {
      try {
         setAnalysisLoading(true);

         // Move progress to Analyzing (step index 1)
         if (activeStep < 1) {
            dispatch(nextStep());
         } else {
            dispatch(setActiveStep(1));
         }

         // show loader step
         setStep(4); // <- changed from 3 to 4

         const email = localStorage.getItem("email");
         const payload = { email, s3_urls: uploadedUrls };

         const response = await axios.post(
            "https://api.urhja.com/generate-quantitative-report",
            JSON.stringify(payload),
            { headers: { "Content-Type": "application/json" } }
         );

         toast.success(
            response?.data.message || "Analysis completed successfully!"
         );

         const fileUrl =
            response.data?.download_link ||
            response.data?.file_url ||
            response.data?.url;

         if (fileUrl) {
            setFinalReportUrl(fileUrl); // ✅ yahan save karo
            setAnalysisDone(true);

            if (activeStep < 2) {
               dispatch(nextStep());
            } else {
               dispatch(setActiveStep(2));
            }
         } else {
            toast.info("Please Select the File Again.");
            // if no fileUrl, bring user back to confirm screen
            setStep(3);
         }
      } catch (error) {
         toast.error("Failed to start analysis.");
         // on API error go back to Confirm Analysis (step 3)
         setStep(3); // <- changed from 2 to 3
      } finally {
         setAnalysisLoading(false);
      }
   };
   // const handlePredefinedAnalysis = async () => {
   //    try {
   //       setAnalysisLoading(true);

   //       // Move progress to Analyzing
   //       if (activeStep < 1) {
   //          dispatch(nextStep());
   //       } else {
   //          dispatch(setActiveStep(1));
   //       }

   //       // loader dikhao
   //       setStep(4);

   //       const email = localStorage.getItem("email");
   //       const payload = {
   //          email,
   //          s3_urls: uploadedUrls, // 👈 uploaded files links
   //          prompt: prompt, // 👈 user ka question
   //       };

   //       const response = await axios.post(
   //          "https://api.urhja.com/generate-quantitative-predefined-report",
   //          JSON.stringify(payload),
   //          { headers: { "Content-Type": "application/json" } }
   //       );

   //       toast.success("Predefined Analysis completed successfully!");

   //       const fileUrl =
   //          response.data?.download_link ||
   //          response.data?.file_url ||
   //          response.data?.url;

   //       if (fileUrl) {
   //          setDownloadUrl(fileUrl);
   //          setAnalysisDone(true);

   //          // progress bar final step
   //          if (activeStep < 2) {
   //             dispatch(nextStep());
   //          } else {
   //             dispatch(setActiveStep(2));
   //          }
   //       } else {
   //          toast.info("Please Select the File Again.");
   //          setStep(7);
   //       }
   //    } catch (error) {
   //       toast.error("Failed to start predefined analysis.");
   //       setStep(7);
   //    } finally {
   //       setAnalysisLoading(false);
   //    }
   // };
   const handlePredefinedAnalysis = async () => {
      try {
         setAnalysisLoading(true);

         if (activeStep < 1) {
            dispatch(nextStep());
         } else {
            dispatch(setActiveStep(1));
         }

         setStep(4); // loader

         const email = localStorage.getItem("email");
         const payload = {
            email,
            s3_urls: uploadedUrls,
            prompt: prompt,
         };

         const response = await axios.post(
            "https://api.urhja.com/generate-quantitative-predefined-report",
            JSON.stringify(payload),
            { headers: { "Content-Type": "application/json" } }
         );

         toast.success(
            response?.data.message ||
               "Predefined Analysis completed successfully!"
         );

         const fileUrl =
            response.data?.download_link ||
            response.data?.file_url ||
            response.data?.url?.s3_url || // ✅ pick nested s3_url
            response.data?.url;

         if (fileUrl) {
            setFinalReportUrl(fileUrl); // ✅ yahan save karo
            setAnalysisDone(true);

            if (activeStep < 2) {
               dispatch(nextStep());
            } else {
               dispatch(setActiveStep(2));
            }
         } else {
            toast.info("Please Select the File Again.");
            setStep(7);
         }
      } catch (error) {
         toast.error("Failed to start analysis.");
         setStep(7);
      } finally {
         setAnalysisLoading(false);
      }
   };

   return (
      <Box
         className={`flex flex-col items-center justify-center ${
            smallHeightLaptop ? "gap-4" : "gap-8"
         } px-2 h-full`}
      >
         {/* 🔹 Step 1: File Upload */}
         {step === 1 && (
            <>
               <Box
                  sx={{
                     width: { xs: "100%", sm: "620px" },
                     padding: { xs: "20px 15px", sm: "30px 20px" },
                     textAlign: "center",
                     borderRadius: "16px",
                     cursor: "pointer",
                     background: "white",
                  }}
                  onClick={() =>
                     document.getElementById("fileUploadInput").click()
                  }
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragOver}
               >
                  {uploading ? (
                     <CircularProgress sx={{ mb: 1 }} />
                  ) : (
                     <CloudUpload
                        sx={{ fontSize: 40, color: "#1890FF", mb: 1 }}
                        className="mx-auto"
                     />
                  )}

                  <Typography
                     sx={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        fontSize: { xs: "15px", sm: "18px" },
                        color: "#000000E0",
                     }}
                  >
                     {isMobile || isTab
                        ? "Upload files"
                        : "Click or drag file to this area to upload"}
                  </Typography>
                  <Typography
                     sx={{
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: { xs: "16px", sm: "16px" },
                        mt: 1,
                        color: "#000000A3",
                     }}
                  >
                     Multiple file upload supported - Make sure the file format
                     is either xlsx or csv only. You should avoid uploading
                     personal details.
                  </Typography>
                  <input
                     id="fileUploadInput"
                     type="file"
                     hidden
                     multiple
                     accept=".xlsx,.csv"
                     onChange={handleFileUploadWithToast}
                  />
               </Box>

               {uploadedFiles.length > 0 && (
                  <Box
                     sx={{
                        width: { xs: "100%", sm: "620px" },
                        background: "#FFFFFF",
                        borderRadius: "16px",
                        overflow: "hidden",
                        display: "flex",
                        height: "147px",
                        flexDirection: "column",
                        mb: 1,
                        color: "black",
                     }}
                  >
                     <Box
                        sx={{
                           background: "#F5F5F5",
                           py: 1.5,
                           px: 3,
                           color: "black",
                        }}
                     >
                        <Stack
                           direction="row"
                           justifyContent="space-between"
                           alignItems="center"
                        >
                           <Typography sx={{ fontWeight: 500 }}>
                              Filename
                           </Typography>
                           <Typography sx={{ fontWeight: 400 }}>
                              {planName} Plan : ({uploadedFiles.length}/
                              {maxLimit} files uploaded)
                           </Typography>
                        </Stack>
                     </Box>

                     <Box
                        sx={{
                           overflowY: "auto",
                           background: "#FFFFFF",
                           "&::-webkit-scrollbar": { width: "8px" },
                        }}
                     >
                        {uploadedFiles.map((file, index) => (
                           <Box
                              key={index}
                              className="flex items-center justify-between py-2 px-6 bg-white"
                           >
                              <Typography>{file.name}</Typography>
                              <DeleteForeverIcon
                                 sx={{
                                    color: "#909090",
                                    cursor: "pointer",
                                    borderRadius: "4px",
                                    "&:hover": {
                                       background: "#DC393B",
                                       color: "#FFFFFF",
                                    },
                                 }}
                                 onClick={() =>
                                    handleRemoveFileWithToast(index)
                                 }
                              />
                           </Box>
                        ))}
                     </Box>
                  </Box>
               )}

               {/* <Button
                  onClick={() => setStep(2)}
                  disabled={disableNext || uploadedFiles.length === 0}
                  sx={{
                     mt: 2,
                     backgroundColor: "#F0CB52",
                     color: "#0A3235",
                     borderRadius: "8px",
                     fontWeight: 600,
                     textTransform: "capitalize",
                     padding: "14px 100px",
                     "&:hover": { backgroundColor: "#84F052" },
                  }}
               >
                  Next Step
               </Button> */}
               <Button
                  onClick={() => setStep(5)} // 🔥 directly step 5 (PromptTheme)
                  disabled={disableNext || uploadedFiles.length === 0}
                  sx={{
                     mt: 2,
                     backgroundColor: "#F0CB52",
                     color: "#0A3235",
                     borderRadius: "8px",
                     fontWeight: 600,
                     textTransform: "capitalize",
                     padding: "14px 100px",
                     "&:hover": { backgroundColor: "#84F052" },
                  }}
               >
                  Next Step
               </Button>
            </>
         )}
         {/*  */}
         {/* {step === 2 && (
            <QuantitativeInsightAnalysis
               onOpenInsight={() => setStep(3)} // 👈 open insight → step 3
               onPredefined={() => setStep(5)} // 👈 predefined → step 4
               onPrevious={() => setStep(1)} // 👈 back to file upload
            />
         )} */}
         {/* 🔹 Step 2: Confirm Analysis */}
         {step === 3 && (
            <Box
               className="flex flex-col items-center justify-center gap-6"
               sx={{ width: { xs: "100%", sm: "620px" } }}
            >
               <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
                  Ready to Start Analysis?
               </Typography>

               <Stack direction="column" spacing={2}>
                  <Button
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
                     onClick={() => setStep(1)}
                  >
                     Previous
                  </Button>
                  <Button
                     onClick={handleStartAnalysis}
                     disabled={analysisLoading}
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
                     {analysisLoading ? "Starting..." : "Start Analysis"}
                  </Button>
               </Stack>
            </Box>
         )}
         {/* 🔹 Step 3: Loader */}
         {step === 4 && !analysisDone && (
            <CustomLoader isEmbeddingLoading={true} isReportLoading={false} />
         )}
         {analysisDone && finalReportUrl && (
            <FinalQuantitativeReport fileUrl={finalReportUrl} />
         )}
         {step === 5 && (
            <Box>
               {/* <PromptTheme
                  onNext={(userPrompt) => {
                     setPrompt(userPrompt); // 👈 save user prompt
                     setStep(7); // 👈 go to step 7
                  }}
               /> */}
               {/* <PromptTheme
                  onNext={(userPrompt) => {
                     setPrompt(userPrompt?.trim()); // trim spaces
                     if (!userPrompt?.trim()) {
                        // 🔹 Agar user ne kuch nahi likha
                        handleStartAnalysis(); // generate-quantitative-report chalegi
                     } else {
                        // 🔹 Agar prompt diya gaya
                        setStep(7); // predefined flow chalu
                     }
                  }}
               /> */}
               <PromptTheme
                  onNext={(userPrompt) => {
                     const cleanPrompt = userPrompt?.trim();
                     setPrompt(cleanPrompt);
                     if (!cleanPrompt) {
                        setStep(3); // Without prompt → normal analysis
                     } else {
                        setStep(7); // With prompt → predefined analysis
                     }
                  }}
                  onPrevious={() => setStep(1)} // 🔹 Move back to file upload
               />
            </Box>
         )}
         {step === 7 && (
            <Box
               className="flex flex-col items-center justify-center gap-6"
               sx={{ width: { xs: "100%", sm: "620px" } }}
            >
               <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
                  Ready to Start Predefined Analysis?
               </Typography>

               <Stack direction="column" spacing={2}>
                  <Button
                     sx={{
                        background: "#D5D5D5",
                        borderRadius: "8px",
                        py: 1.75,
                        px: 17,
                        width: { xs: "100%", sm: "auto" },
                        color: "#0A3235",
                        textTransform: "capitalize",
                        "&:hover": { background: "#F5F5F5" },
                        fontWeight: 500,
                     }}
                     onClick={() => setStep(5)}
                  >
                     Previous
                  </Button>
                  <Button
                     onClick={handlePredefinedAnalysis}
                     disabled={analysisLoading}
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
                        "&:hover": { backgroundColor: "#84F052" },
                        "&.Mui-disabled": { color: "#FFFFFF" },
                     }}
                  >
                     {analysisLoading ? "Starting..." : "Start Analysis"}
                  </Button>
               </Stack>
            </Box>
         )}
      </Box>
   );
};
export default XlsAndCSVFile;
