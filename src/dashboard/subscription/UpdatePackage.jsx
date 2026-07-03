import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Stack,
  Typography,
  DialogTitle,
} from "@mui/material";
import styled from "styled-components";
import UpdateIcon from "@mui/icons-material/Update";
import Repo from "../../repo/Repo";
import Toast from "../../Toast";
export const Btn = styled(Button)({
  backgroundColor: "rgba(96, 207, 101, 1) !important",
  boxShadow: "0px 4px 4px rgba(41, 89, 43, 0.2)",
  borderRadius: "4px",
  width: "100px",
  color: "#FFF",
  textTransform: "capitalize",
});
const UpdatePackage = ({ open, plan, onClose }) => {
  console.log(plan);
  const handleClose = () => {
    onClose();
  };

  const update = async () => {
    let { data } = await Repo.subscribe({
      request: {
        method: "updatePackage",
        data: {
          email: localStorage.getItem("email"),
          package: plan,
        },
      },
    });
    if (data.response.status.statusCode === 200) {
      Toast("error", "Package updated successfully");
      handleClose();
    } else {
      Toast("error", data.response.status.statusDescription);
    }

    console.log(data);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Stack justifyContent="center" alignItems="center">
          <UpdateIcon fontSize="large" />
          <Typography variant="h5">update your package</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack justifyContent="center" alignItems="center">
          <Btn onClick={update}>update</Btn>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default UpdatePackage;
