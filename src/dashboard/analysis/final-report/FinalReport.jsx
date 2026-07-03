// src/components/your-path/FinalReport.jsx
import {
  Box,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadImg from "../../../assets/icon.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import api from "../../../Repo/Repo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Text } from "../analysis-type/OpenInsight";

const FinalReport = ({ handleNewAnalysis }) => {
  console.log("FinalReport rendered");
  const { analysisReport } = useSelector((state) => state.analysis);
  const { user } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  // ✅ Send analysis report link to /success API once it's available
  useEffect(() => {
    if (analysisReport && user?.email) {
      const payload = {
        email: user.email,
        link: analysisReport,
      };

      api.successLink(payload)
        .then(() => {
          console.log("Success link sent successfully.");
        })
        .catch((err) => {
          console.error("Failed to send success link:", err);
        });
    }
  }, [analysisReport, user]);

  const handleSubmitFeedback = async () => {
    if (!message.trim()) return;

    try {
      const payload = {
        email,
        type: "Feedback",
        message: message.trim(),
      };

      await api.userEnquiry(payload);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            py: 2,
            width: { xs: "100%", md: "75%" },
            borderRadius: "16px",
            background: "#3F5A5C",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: "64px", color: "#52F064" }} />
          <Stack>
            <Text
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "28px",
                color: "#52F064",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Success!
            </Text>
            <Text
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                color: "#FFFFFF",
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Your analysis report has been generated
            </Text>
          </Stack>
        </Box>
      </Box>

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
        {analysisReport && (
          <Button
            variant="contained"
            onClick={() => window.open(analysisReport)}
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
        )}

        <Button
          variant="contained"
          onClick={handleNewAnalysis}
          startIcon={<AddCircleIcon sx={{ color: "#0A3235", fontSize: 20 }} />}
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
            label="Your Email"
            fullWidth
            disabled
            value={email}
            sx={{ mt: 2, display: "none" }}
          />

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
            <Typography sx={{ mt: 2, color: "green", fontFamily: "Poppins" }}>
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

export default FinalReport;
