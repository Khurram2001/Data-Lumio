// components/DeleteDialog.jsx
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

const DeleteDialog = ({ open, onClose, onDelete, loading }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ background: "#f6f6f6" }}>
        <Stack alignItems="center" justifyContent="center" spacing={3}>
          <HighlightOffIcon sx={{ color: "#E25050", fontSize: "60px" }} />
          <TextPop variant="h6" align="center">
            Are you sure you want to delete your account? All your data will be
            permanently removed.
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
            <Button
              variant="contained"
              sx={{ textTransform: "none", background: "#E25050 !important" }}
              onClick={onDelete}
            >
              Delete Account
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
