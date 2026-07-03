import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../Repo/Repo"; // ✅ Make sure this path is correct

const ContactDialog = ({ open, onClose }) => {
  const [email] = useState(localStorage.getItem("email") || "guest@example.com");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    setLoading(true);
    try {
      await api.userEnquiry({
        email,
        type: "Enterprise",
        message: message.trim(),
      });

      toast.success("Message sent successfully!");
      setMessage("");
      setTimeout(() => {
        onClose(); // Auto-close popup after success
      }, 1200); // slight delay for toast
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography
            sx={{
              fontFamily: "Poppins",
              textAlign: "center",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Contact Us
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontFamily: "Poppins",
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Get in touch • Email : Info@datalumio.co
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Hidden email, still used in payload */}
            <input type="hidden" value={email} readOnly />
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={4}
              fullWidth
              InputProps={{
                style: { fontFamily: "Poppins" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins" },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ fontFamily: "Poppins", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              fontFamily: "Poppins",
              textTransform: "none",
              background: "#0A3235",
              "&:hover": { background: "#0A3235" },
            }}
          >
            {loading ? "Sending..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactDialog;
