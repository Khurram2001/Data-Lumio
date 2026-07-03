import { Box, Button, Grid, InputLabel, Stack, styled } from "@mui/material";

export const Main = styled(Grid)({
  background: "rgba(235, 255, 230, 1)",
  borderRadius: "8px",
});
export const Pro = styled(Button)({
  background: "rgba(123, 193, 105, 1)",
  "&:hover": {
    background: "rgba(123, 193, 105, 1)",
  },
  color: "#FFF",
  textTransform: "capitalize",
});

export const Change = styled(Button)({
  background: "rgba(123, 193, 105, 1)",
  "&:hover": {
    background: "rgba(123, 193, 105, 1)",
  },
  textTransform: "capitalize",
  color: "#FFF",
});

export const Card = styled(Stack)({
  background: "rgba(246, 246, 246, 1)",
  borderRadius: "8px",
});

export const Label = styled(InputLabel)({
  background: "rgba(194, 222, 255, 1)",
  padding: "2px",
  borderRadius: "2px",
  color: "rgba(32, 102, 187, 1)",
});

export const Save = styled(Button)({
  background: "rgba(23, 187, 148, 1)",
  color: "#FFF",
  marginLeft: "10px",
  "&:hover": {
    background: "rgba(17, 167, 134, 1)",
  },
});
export const Cancel = styled(Button)({
  background: "rgba(217, 217, 217, 1)",
  color: "#FFF",
  marginRight: "10px",
  "&:hover": {
    background: "rgba(205, 205, 205, 1)",
  },
});

export const CustomBox = styled(Box)({
  background: "#f3f3f3",
  width: "100%",
  padding: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
});
