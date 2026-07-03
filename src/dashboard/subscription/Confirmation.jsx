import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import Toast from "../../Toast";
import Repo from "../../repo/Repo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../userSlice";

export default function Confirmation({ onClose, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.search.includes("success=true")) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      // const session_id = urlSearchParams.get("session_id");
      const session_id = id;
      if (!localStorage.getItem(`payment_success_${session_id}`)) {
        localStorage.setItem(`payment_success_${session_id}`, true);
        console.log("Pushing to dataLayer:", {
          success: true,
          session_id,
          page: window.location.pathname,
        });

        // Call the backend API
        handleSubmitSession(session_id);
      }
    }
  }, []);

  const handleSubmitSession = async (id) => {
    if (!localStorage.getItem(`session_handled_${id}`)) {
      localStorage.setItem(`session_handled_${id}`, true);

      try {
        setLoading(true);
        let { data } = await Repo.createPortalSession({
          session_id: id,
          email: localStorage.getItem("email"),
        });

        if (data?.url) {
          // Force a fresh user data fetch to update the UI
          await dispatch(getUser());
          setLoading(false);
          Toast("success", "Payment Successful");
          // Clear any cached data
          localStorage.removeItem(`payment_success_${id}`);
          localStorage.removeItem(`session_handled_${id}`);
          onClose();
          // Force a page reload to ensure fresh state
          window.location.href = "/subscription";
        } else {
          setLoading(false);
          Toast("error", data.response.status.statusMessage);
        }
      } catch (err) {
        console.log("err:", err);
        setLoading(false);
        Toast("error", "Error processing payment");
      }
    }
  };

  const toggle = () => {
    if (!loading) {
      onClose();
    }
  };
  return (
    <Dialog open={true} onClose={toggle} fullWidth maxWidth="xs">
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            rowGap: "16px",
          }}
        >
          {loading && <Typography>Please Wait</Typography>}

          <input type="hidden" id="session-id" name="session_id" value={id} />
          {loading && <CircularProgress size={20} sx={{ marginRight: 1 }} />}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
