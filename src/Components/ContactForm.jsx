// src/Components/ContactForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import api from "../Repo/Repo";

// Inquiry types array
const inquiryTypes = [
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Technical Support", label: "Technical Support" },
  { value: "Billing & Payments", label: "Billing & Payments" },
  { value: "Subscription & Plans", label: "Subscription & Plans" },
  { value: "Account & Login Issues", label: "Account & Login Issues" },
  { value: "Sales Inquiry", label: "Sales Inquiry" },
  { value: "Partnership Opportunities", label: "Partnership Opportunities" },
  { value: "Complaint or Feedback", label: "Complaint or Feedback" },
  { value: "Product Feature Request", label: "Product Feature Request" },
  { value: "Security Concern", label: "Security Concern" },
  { value: "Data & Privacy Request", label: "Data & Privacy Request" },
  { value: "Other", label: "Other" },
];

// Description helper
const getDescription = (type) => {
  switch (type) {
    case "General Inquiry":
      return "For questions or comments not covered by other categories.";
    case "Technical Support":
      return "Help with using the product, bugs, or errors.";
    case "Billing & Payments":
      return "Issues related to charges, invoices, refunds, or payment methods.";
    case "Subscription & Plans":
      return "Questions about plans, upgrades, cancellations, or renewals.";
    case "Account & Login Issues":
      return "Password resets, access problems, or account details.";
    case "Sales Inquiry":
      return "Interested in purchasing or learning more about features or pricing.";
    case "Partnership Opportunities":
      return "Business collaborations, integrations, or affiliate interest.";
    case "Complaint or Feedback":
      return "Dissatisfaction, suggestions for improvement, or general feedback.";
    case "Product Feature Request":
      return "Suggest a new feature or improvement.";
    case "Security Concern":
      return "Report a vulnerability or suspicious activity.";
    case "Data & Privacy Request":
      return "Requesting data export, deletion, or information on privacy policies.";
    case "Other":
      return "Catch-all for anything that doesn’t fit the above.";
    default:
      return "";
  }
};

const ContactForm = ({ onClose }) => {
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !message.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await api.userEnquiry({
        email: email || "guest@example.com",
        type,
        message,
      });
      toast.success("Message sent successfully!");
      setType("");
      setMessage("");
      if (onClose) onClose();
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, fontFamily: "Poppins" }}
    >
      <Stack spacing={2}>
        <TextField
          label="Inquiry Type"
          select
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          InputLabelProps={{ style: { fontFamily: "Poppins" } }}
          sx={{ fontFamily: "Poppins" }}
        >
          {inquiryTypes.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ display: "block", py: 1, fontFamily: "Poppins" }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, fontFamily: "Poppins" }}
              >
                {option.label}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontFamily: "Poppins" }}
              >
                {getDescription(option.value)}
              </Typography>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Message"
          multiline
          rows={4}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          InputLabelProps={{ style: { fontFamily: "Poppins" } }}
          InputProps={{ style: { fontFamily: "Poppins" } }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: "#52F064",
            color: "#0A3235",
            fontWeight: 600,
            fontFamily: "Poppins",
            "&:hover": { bgcolor: "#42dd55" },
          }}
        >
          {loading ? "Sending..." : "Submit"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactForm;
