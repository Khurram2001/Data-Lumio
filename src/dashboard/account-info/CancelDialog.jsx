// components/CancelDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  Stack,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { TextPop } from "../../landing Page/Home";

const CancelDialog = ({ open, onClose, onProceed, loading }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ background: "#f6f6f6" }}>
        <Stack alignItems="center" justifyContent="center" spacing={3}>
          <HighlightOffIcon sx={{ color: "#E25050", fontSize: "60px" }} />
          <TextPop variant="h6" align="center">
            Are you sure you want to cancel your subscription? You will have
            access to your subscription till the end of your billing cycle.
          </TextPop>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "30vh",
              }}
            >
              <CircularProgress size={40} thickness={4} color="primary" />
            </Box>
          ) : (
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Button
                variant="contained"
                onClick={onClose}
                sx={{
                  background: "#f6f6f6 !important",
                  textTransform: "capitalize",
                  color: "#353535",
                }}
              >
                Not Now
              </Button>
              <Button
                variant="contained"
                onClick={onProceed}
                sx={{
                  background: "#1E4F6B",
                  "&:hover": {
                    background: "#163C54",
                  },
                }}
              >
                Proceed
              </Button>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CancelDialog;
