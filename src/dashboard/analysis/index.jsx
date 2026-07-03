import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Steps from "./Steps";
import UploadFile from "./upload-file/UploadFile";
import AnalysisType from "./analysis-type/AnalysisType";
import FinalReport from "./final-report/FinalReport";
import axios from "axios";
import Toast from "../../Toast";
import { useDispatch, useSelector } from "react-redux";
import {
   addUploadedFileRes,
   addUploadedFiles,
   clearAnalysisReport,
   clearUploadedData,
   nextStep,
   previousStep,
   removeUploadedFile,
   resetStep,
} from "./analysisSlice";
import { baseURL } from "../../Repo/Repository";
import UnifiedInsightAnalysis from "./UnifiedInsightAnalysis";

const steps = [
   { label: "Upload Files", sub: "File format: PDF & DOC only." },
   {
      label: "Define your analysis",
      sub: "Guide the AI or let it explore freely.",
   },
   { label: "Final Report", sub: "View & Download analysis report." },
];

const Analysis = () => {
   const dispatch = useDispatch();
   const { activeStep, uploadedFiles, uploadedFileRes } = useSelector(
      (state) => state.analysis
   );
   const { user } = useSelector((state) => state.user);
   const [loading, setLoading] = useState(false);

   // Clear any previous analysis data when landing on this page
   useEffect(() => {
      dispatch(clearUploadedData());
      dispatch(clearAnalysisReport());
      dispatch(resetStep());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const smallHeightLaptop = useMediaQuery(
      "(max-height:700px) and (min-width:600px)"
   );
   const isMobile = useMediaQuery("(max-width:600px)");
   const isTab = useMediaQuery("(max-width:1000px)");

   const handleNext = () => {
      if (activeStep < steps.length - 1) {
         dispatch(nextStep());
         setTimeout(() => {
            console.log("handleNext called, new activeStep:", activeStep + 1);
         }, 0);
      }
   };

   const handlePrevious = () => {
      if (activeStep < steps.length - 1) dispatch(previousStep());
   };

   const handleNewAnalysis = () => {
      if (activeStep > 0) {
         dispatch(resetStep());
         dispatch(clearUploadedData());
         dispatch(clearAnalysisReport());
      }
   };

   // Updated file limit logic
   const getMaxFileLimit = (plan) => {
      if (plan?.toLowerCase().includes("pro")) return 10;
      return 5; // Both starter and free plans allow 5 files now
   };

   const handleFileUpload = async (e) => {
      const files = Array.from(e.target.files || []);
      const validFiles = files.filter((file) =>
         [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
         ].includes(file.type)
      );

      if (validFiles.length === 0) return;

      const email = localStorage.getItem("email");
      if (!email) {
         Toast("error", "Email not found");
         return;
      }

      const maxLimit = getMaxFileLimit(user?.plan);
      const totalFiles = uploadedFiles.length + validFiles.length;

      if (totalFiles > maxLimit) {
         Toast(
            "error",
            `Limit reached. Your ${
               user?.plan || "free"
            } plan allows up to ${maxLimit} files. Please upgrade your plan to continue.`
         );
         return;
      }

      const formData = new FormData();
      formData.append("email", email);
      validFiles.forEach((file) => formData.append("files", file));

      setLoading(true);
      try {
         const res = await axios.post(`${baseURL}/upload`, formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });

         if (res?.data?.error) {
            Toast("error", res.data.error);
            return;
         }

         if (res?.data?.uploaded_files?.length) {
            dispatch(
               addUploadedFiles(
                  validFiles.map((file) => ({
                     name: file.name,
                     size: file.size,
                     type: file.type,
                  }))
               )
            );
            dispatch(addUploadedFileRes(res.data.uploaded_files));
         }
      } catch (err) {
         console.error("Upload failed", err);
         Toast("error", "File upload failed");
      } finally {
         setLoading(false);
      }
   };

   const removeFile = (index) => {
      dispatch(removeUploadedFile(index));
   };

   const isStepActive = (index) => index === activeStep;
   const isStepCompleted = (index) => {
      if (index < activeStep) return true;
      if (index === steps.length - 1 && activeStep === steps.length - 1)
         return true;
      return false;
   };

   const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
         handleFileUpload({ target: { files } });
      }
   };

   const handleDragOver = (event) => {
      event.preventDefault();
   };

   return (
      <div
         className={`py-5 px-2 sm:py-8 sm:px-5 xl:py-2 xl:px-2 flex flex-col
     gap-4 mt-4 sm:mt-0 h-[92vh] ${
        smallHeightLaptop ? "sm:gap-5" : "sm:gap-11"
     } `}
      >
         <Steps
            steps={steps}
            activeStep={activeStep}
            isStepActive={isStepActive}
            isStepCompleted={isStepCompleted}
         />

         {activeStep === 0 && (
            <UploadFile
               smallHeightLaptop={smallHeightLaptop}
               isMobile={isMobile}
               isTab={isTab}
               handleDrop={handleDrop}
               handleDragOver={handleDragOver}
               handleFileUpload={handleFileUpload}
               removeFile={removeFile}
               // handleNext={handleNext}
               handleNext={() => {
                  dispatch(nextStep()); // Goes to MergedAnalysis directly now
               }}
               loading={loading}
               disableNext={loading || uploadedFiles.length === 0}
            />
         )}

         {activeStep === 1 && (
            <UnifiedInsightAnalysis
               smallHeightLaptop={smallHeightLaptop}
               handlePrevious={handlePrevious}
               handleNext={handleNext}
            />
         )}

         {activeStep === 2 && (
            <FinalReport
               handleNewAnalysis={handleNewAnalysis}
               smallHeightLaptop={smallHeightLaptop}
            />
         )}
      </div>
   );
};

export default Analysis;
