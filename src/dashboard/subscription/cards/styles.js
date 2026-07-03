import {
  Box,
  Button,
  Grid,
  Stack,
  TableCell,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";

export const CustomGrid = styled(Grid)({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  minHeight: "100%",
  padding: "20px 5px",
});
export const HeadingText = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "16px",
  color: "#14224B",
});
export const PriceTitle = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: "30px",
  color: "#353535",
  textAlign: "center",
});
export const Text = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "13px",
  color: "#353535",
});

export const SubTitle = styled(Box)(({ theme }) => ({
  background: "#0A3235",
  color: "#ffffff",
  fontFamily: "Poppins",
  padding: "12px 37px",
  borderRadius: "6px",
  display: "flex",
  fontsize: "20px",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "36px",
  margin: "0 auto",
  [theme.breakpoints?.down("lg")]: {
    fontSize: "18px",
  },
}));
export const PlanCard = styled(Stack)(({ theme }) => ({
  height: "100%",
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "space-evenly",
  padding: "15px 19px",
  [theme.breakpoints.down("sm")]: {
    minHeight: "350px", // Adjust this value as needed for smaller screens
  },
  [theme.breakpoints.up("md")]: {
    minHeight: "50vh",
  },
  [theme.breakpoints.up("lg")]: {
    minHeight: "350px",
  },
}));
export const BtnSub = styled(Button)({
  color: "#353535",
  background: "#f3f3f3 !important",
  textTransform: "none",
});
export const BtnStarterSub = styled(Button)({
  color: "white",
  background: "#0A3134 !important",
  textTransform: "none",
});
export const BtnSubscribed = styled(Button)({
  color: "#f3f3f3",
  background: "#0A3235 !important",
  textTransform: "none",
  cursor: "default",
});

export const CustomBox = styled(Box)({
  borderBottom: "3px solid #F3F3F3",
  display: "flex",
  width: "100%",
  padding: "8px",
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    border: "none",
    fontFamily: "Poppins",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderTop: "none",
    border: "none",
    fontFamily: "Poppins",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
