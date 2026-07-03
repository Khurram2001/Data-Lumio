import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import api from "../Repo/Repo";
import "react-toastify/dist/ReactToastify.css";

// Inquiry types with subheadings
const inquiryTypes = [
  {
    value: "General Inquiry",
    label: "General Inquiry",
    sub: "For questions or comments not covered by other categories.",
  },
  {
    value: "Technical Support",
    label: "Technical Support",
    sub: "Help with using the product, bugs, or errors.",
  },
  {
    value: "Billing & Payments",
    label: "Billing & Payments",
    sub: "Issues related to charges, invoices, refunds, or payment methods.",
  },
  {
    value: "Subscription & Plans",
    label: "Subscription & Plans",
    sub: "Questions about plans, upgrades, cancellations, or renewals.",
  },
  {
    value: "Account & Login Issues",
    label: "Account & Login Issues",
    sub: "Password resets, access problems, or account details.",
  },
  {
    value: "Sales Inquiry",
    label: "Sales Inquiry",
    sub: "Interested in purchasing or learning more about features or pricing.",
  },
  {
    value: "Partnership Opportunities",
    label: "Partnership Opportunities",
    sub: "Business collaborations, integrations, or affiliate interest.",
  },
  {
    value: "Complaint or Feedback",
    label: "Complaint or Feedback",
    sub: "Dissatisfaction, suggestions for improvement, or general feedback.",
  },
  {
    value: "Product Feature Request",
    label: "Product Feature Request",
    sub: "Suggest a new feature or improvement.",
  },
  {
    value: "Security Concern",
    label: "Security Concern",
    sub: "Report a vulnerability or suspicious activity.",
  },
  {
    value: "Data & Privacy Request",
    label: "Data & Privacy Request",
    sub: "Requesting data export, deletion, or information on privacy policies.",
  },
  {
    value: "Other",
    label: "Other",
    sub: "Catch-all for anything that doesn’t fit the above.",
  },
];

const Contact = () => {
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !message.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: email || "guest@example.com",
        type,
        message: message.trim(),
      };

      await api.userEnquiry(payload);
      toast.success("Message sent successfully!");
      setType("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting contact form:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 8,
        px: 2,
        fontFamily: "Poppins",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 600, borderRadius: 3 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: "#0A3235",
            fontWeight: 600,
            fontFamily: "Poppins",
          }}
        >
          Contact Us
        </Typography>
        <Typography sx={{ mb: 4, color: "#555", fontFamily: "Poppins" }}>
          We'd love to hear from you. Please fill out the form below.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Email hidden from user but still included in payload */}
            <TextField
              label="Email"
              value={email}
              fullWidth
              disabled
              variant="outlined"
              sx={{ display: "none", fontFamily: "Poppins" }}
            />

            <TextField
              select
              label="Inquiry Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { fontFamily: "Poppins" } }}
              sx={{ fontFamily: "Poppins" }}
            >
              {inquiryTypes.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ fontFamily: "Poppins" }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight={500} sx={{ fontFamily: "Poppins" }}>
                      {option.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Poppins" }}>
                      {option.sub}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Message"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { fontFamily: "Poppins" } }}
              InputProps={{ style: { fontFamily: "Poppins" } }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#0F484C",
                color: "#FFFFFF",
                fontWeight: 600,
                fontFamily: "Poppins",
                "&:hover": { bgcolor: "#0F484C" },
              }}
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Contact;
