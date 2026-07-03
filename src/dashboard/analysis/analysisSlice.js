import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   activeStep: 0,
   uploadedFiles: [],
   uploadedFileRes: [],
   loading: false,
   analysisReport: null,
};

export const analysisSlice = createSlice({
   name: "analysis",
   initialState,
   reducers: {
      setActiveStep: (state, action) => {
         state.activeStep = action.payload;
      },
      nextStep: (state) => {
         state.activeStep += 1;
      },
      previousStep: (state) => {
         state.activeStep -= 1;
      },
      resetStep: (state) => {
         state.activeStep = 0;
      },

      addUploadedFiles: (state, action) => {
         state.uploadedFiles = [
            ...state.uploadedFiles,
            ...action.payload.map((file) => ({
               name: file.name,
               size: file.size,
               type: file.type,
            })),
         ];
      },
      addUploadedFileRes: (state, action) => {
         state.uploadedFileRes = [...state.uploadedFileRes, ...action.payload];
      },
      removeUploadedFile: (state, action) => {
         const index = action.payload;
         const fileToRemove = state.uploadedFiles[index];
         state.uploadedFiles = state.uploadedFiles.filter(
            (_, i) => i !== index
         );
         state.uploadedFileRes = state.uploadedFileRes.filter(
            (res) => !res.includes(fileToRemove.name)
         );
      },
      clearUploadedData: (state) => {
         state.uploadedFiles = [];
         state.uploadedFileRes = [];
      },

      setLoading: (state, action) => {
         state.loading = action.payload;
      },
      setAnalysisReport: (state, action) => {
         state.analysisReport = action.payload;
      },
      clearAnalysisReport: (state) => {
         state.analysisReport = initialState.analysisReport;
      },
      resetAnalysis: () => initialState,
   },
});

export const {
   setActiveStep,
   nextStep,
   previousStep,
   resetStep,
   addUploadedFiles,
   addUploadedFileRes,
   removeUploadedFile,
   clearUploadedData,
   setLoading,
   setAnalysisReport,
   resetAnalysis,
   clearAnalysisReport,
} = analysisSlice.actions;

export default analysisSlice.reducer;
