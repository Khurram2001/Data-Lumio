// src/components/FinalReportStatic.jsx
import {
   Box,
   Button,
   Stack,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   IconButton,
   Typography,
   TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DownloadImg from "../../../assets/icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FinalQuantitativeReport = ({ fileUrl }) => {
   const navigate = useNavigate();

   const [feedbackOpen, setFeedbackOpen] = useState(false);
   const [message, setMessage] = useState("");
   const [submitted, setSubmitted] = useState(false);
   const handleDownload = () => {
      if (!fileUrl) return;
      window.open(fileUrl, "_blank");
      // if (!fileUrl) return;
      // const link = document.createElement("a");
      // link.href = fileUrl;
      // link.setAttribute("download", "analysis-report.xlsx");
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
   };
   const handleSubmitFeedback = async () => {
      if (!message.trim()) return;

      try {
         const email = localStorage.getItem("email"); // 👈 user ka email localStorage se lo
         if (!email) {
            toast.error("Email not found. Please login again.");
            return;
         }

         const payload = {
            email,
            type: "Feedback",
            message: message.trim(),
         };

         await axios.post("https://api.urhja.com/user-enquiry", payload);

         setSubmitted(true);
         setMessage("");
         toast.success("Feedback submitted successfully!");

         setTimeout(() => {
            setFeedbackOpen(false);
            setSubmitted(false);
         }, 1500);
      } catch (err) {
         console.error("Error submitting feedback:", err);
         toast.error("Failed to submit feedback. Please try again.");
      }
   };

   const commonButtonSx = {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: "16px",
      borderRadius: "8px",
      textTransform: "capitalize",
      py: 1.75,
      width: { xs: "100%", sm: "320px" },
      height: "48px",
      minWidth: "280px",
      alignSelf: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   };

   return (
      <>
         <Box
            sx={{
               py: 3,
               px: { xs: 0, sm: 2 },
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               flexDirection: "column",
               gap: 3,
            }}
         >
            {/* ✅ Success Box */}
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 2,
                  py: 2,
                  width: { xs: "90%", sm: "80%", md: "600px", lg: "900px" },
                  maxWidth: "1200px",
                  height: "300px",
                  borderRadius: "16px",
                  background: "#3F5A5C",
               }}
            >
               <CheckCircleIcon sx={{ fontSize: "64px", color: "#52F064" }} />
               <Stack>
                  <Typography
                     sx={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "28px",
                        color: "#52F064",
                        fontWeight: 500,
                        textAlign: "center",
                     }}
                  >
                     Success!
                  </Typography>
                  <Typography
                     sx={{
                        fontSize: { xs: "14px", sm: "16px" },
                        color: "#FFFFFF",
                        fontWeight: 400,
                        textAlign: "center",
                     }}
                  >
                     Your analysis report has been generated
                  </Typography>
               </Stack>
            </Box>
         </Box>

         {/* ✅ Action Buttons */}
         <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            width="100%"
            gap={2}
            mt={{ xs: 2, sm: "auto" }}
            sx={{ px: 2 }}
         >
            <Button
               variant="contained"
               onClick={handleDownload} // 👈 ab ye download karega
               startIcon={
                  <img src={DownloadImg} alt="Download" style={{ width: 20 }} />
               }
               sx={{
                  ...commonButtonSx,
                  backgroundColor: "#F0CB52",
                  color: "#0A3235",
                  "&:hover": { backgroundColor: "#84F052" },
               }}
            >
               Download File
            </Button>

            <Button
               onClick={() => navigate("/step-analysis")}
               variant="contained"
               startIcon={
                  <AddCircleIcon sx={{ color: "#0A3235", fontSize: 20 }} />
               }
               sx={{
                  ...commonButtonSx,
                  backgroundColor: "#D5D5D5",
                  color: "#0A3235",
                  "&:hover": { backgroundColor: "#F5F5F5" },
               }}
            >
               Start New Analysis
            </Button>

            <Button
               variant="outlined"
               onClick={() => setFeedbackOpen(true)}
               sx={{
                  ...commonButtonSx,
                  border: "1px solid #52F064",
                  color: "#52F064",
                  "&:hover": {
                     backgroundColor: "#52F064",
                     color: "#0A3235",
                     border: "1px solid #52F064",
                  },
               }}
            >
               Send Feedback
            </Button>
         </Stack>

         {/* ✅ Feedback Dialog */}
         <Dialog
            open={feedbackOpen}
            onClose={() => setFeedbackOpen(false)}
            fullWidth
            maxWidth="sm"
         >
            <DialogTitle sx={{ color: "#52F064", fontFamily: "Poppins" }}>
               Feedback
               <IconButton
                  onClick={() => setFeedbackOpen(false)}
                  sx={{ position: "absolute", right: 8, top: 8 }}
               >
                  <CloseIcon />
               </IconButton>
            </DialogTitle>

            <DialogContent>
               <Typography sx={{ fontFamily: "Poppins" }}>
                  We'd love your feedback!
               </Typography>

               <TextField
                  label="Your Message"
                  fullWidth
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ mt: 2 }}
               />

               {submitted && (
                  <Typography
                     sx={{ mt: 2, color: "green", fontFamily: "Poppins" }}
                  >
                     Thank you for your feedback!
                  </Typography>
               )}
            </DialogContent>

            <DialogActions>
               <Button
                  onClick={() => setFeedbackOpen(false)}
                  sx={{ fontFamily: "Poppins" }}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleSubmitFeedback}
                  disabled={!message.trim()}
                  variant="contained"
                  sx={{
                     backgroundColor: "#52F064",
                     color: "#0A3235",
                     fontFamily: "Poppins",
                  }}
               >
                  Submit
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default FinalQuantitativeReport;
