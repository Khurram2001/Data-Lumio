import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Steps from "../Steps";

import Toast from "../../../Toast";
import { useDispatch, useSelector } from "react-redux";
import {
   addUploadedFiles,
   clearAnalysisReport,
   clearUploadedData,
   nextStep,
   previousStep,
   removeUploadedFile,
   resetStep,
} from "../analysisSlice";
import XlsAndCSVFile from "./XlsAndCSVFile";

const steps = [
   { label: "Upload Files", sub: "File format: xlsx & csv only." },
   { label: "Analyzing", sub: "We are processing your data." },
   { label: "Final Report", sub: "View & Download analysis report." },
];

const QuantittiveFileUpload = () => {
   const dispatch = useDispatch();
   const { activeStep, uploadedFiles } = useSelector((state) => state.analysis);
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
      }
   };

   // ✅ File limit by plan
   const getMaxFileLimit = (plan) => {
      if (plan?.toLowerCase().includes("pro")) return 10;
      return 5; // starter & free plans
   };

   // ✅ xlsx and csv allowed
   const handleFileUpload = (e) => {
      const files = Array.from(e.target.files || []);
      const validFiles = files.filter(
         (file) =>
            file.name.toLowerCase().endsWith(".xlsx") ||
            file.name.toLowerCase().endsWith(".csv")
      );

      if (validFiles.length === 0) {
         Toast("error", "Only XLSX and CSV files are allowed");
         return;
      }

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

      // ✅ Redux me files store karo
      dispatch(
         addUploadedFiles(
            validFiles.map((file) => ({
               name: file.name,
               size: file.size,
               type: file.type,
            }))
         )
      );
   };

   const removeFile = (index) => {
      dispatch(removeUploadedFile(index));
   };

   const isStepActive = (index) => index === activeStep;
   const isStepCompleted = (index) => {
      if (index < activeStep) return true;
      // if (index === steps.length - 1 && activeStep === steps.length - 1)
      //    return true;
      if (activeStep === steps.length - 1) return true;
      if (index < activeStep) return true;
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

         <XlsAndCSVFile
            smallHeightLaptop={smallHeightLaptop}
            isMobile={isMobile}
            isTab={isTab}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            handleNext={handleNext}
            loading={loading}
            disableNext={loading || uploadedFiles.length === 0}
         />
      </div>
   );
};

export default QuantittiveFileUpload;
