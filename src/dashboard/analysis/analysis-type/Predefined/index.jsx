import React, { useState } from "react";
import AddTheme from "./Theme";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Toast from "../../../../Toast";
import { baseURL } from "../../../../Repo/Repository";
import { setAnalysisReport } from "../../analysisSlice";

const PredefinedAnalysis = ({
   smallHeightLaptop,
   setSelectedType,
   handleNext,
}) => {
   const [inputValue, setInputValue] = useState("");
   const [themes, setThemes] = useState([]);
   const [question, setQuestion] = useState("");
   const [loading, setLoading] = useState(false);
   const user = useSelector((state) => state.user.user);
   const uploadedFileRes = useSelector(
      (state) => state.analysis.uploadedFileRes
   );
   const dispatch = useDispatch();

   // Use the same logic as file upload limit
   const getMaxThemeLimit = (plan) => {
      if (plan?.toLowerCase().includes("pro")) return 10;
      return 5;
   };
   const themeLimit = getMaxThemeLimit(user?.plan);

   const runAnalysis = async () => {
      const email = localStorage.getItem("email");
      if (!email) return Toast("error", "Email not found");
      if (!uploadedFileRes.length)
         return Toast("error", "No uploaded file found");
      if (!themes.length)
         return Toast("error", "Please add at least one theme");
      setLoading(true);
      try {
         const saveRes = await axios.post(`${baseURL}/save-embeddings`, {
            email,
            s3_urls: uploadedFileRes,
         });
         if (saveRes?.data?.error) {
            Toast("error", saveRes.data.error);
            setLoading(false);
            return;
         }
         const themeNames = themes.map((t) => t.name || t);
         const reportRes = await axios.post(
            `${baseURL}/generate-predefinedinsight-report`,
            {
               email,
               s3_urls: uploadedFileRes,
               themes: themeNames,
               query:
                  question ||
                  "Analyse these documents and extract deep insights",
            }
         );
         if (reportRes?.data?.message && reportRes?.data?.url) {
            Toast("success", reportRes.data.message);
            dispatch(setAnalysisReport(reportRes.data.url));
            if (typeof handleNext === "function") {
               handleNext();
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
         setLoading(false);
      }
   };

   return (
      <AddTheme
         smallHeightLaptop={smallHeightLaptop}
         inputValue={inputValue}
         setInputValue={setInputValue}
         themes={themes}
         setThemes={setThemes}
         handleNext={runAnalysis}
         handleBack={() => setSelectedType(null)}
         themeLimit={themeLimit}
         question={question}
         setQuestion={setQuestion}
         loading={loading}
      />
   );
};

export default PredefinedAnalysis;
