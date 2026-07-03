import React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { Text } from "../Home/index";
import { TextPop } from "../Home/index";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Comparison = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const data = [
    {
      feature: "Purpose",
      datalumio: {
        icon: "check",
        text: "Designed specifically for automated data",
      },
      chatgpt: { icon: "warning", text: "General-purpose conversational" },
    },
    {
      feature: "Data upload Support",
      datalumio: { icon: "check", text: "Yes, upload datasets directly" },
      chatgpt: { icon: "cross", text: "No Native file upload for datasets" },
    },
    {
      feature: "Qualitative Data Analysis",
      datalumio: { icon: "check", text: "Yes, with thematic insights" },
      chatgpt: { icon: "warning", text: "Yes, but requires manual prompts" },
    },
    {
      feature: "Quantitative Data Analysis",
      datalumio: { icon: "check", text: "Yes, with statistical summaries" },
      chatgpt: {
        icon: "warning",
        text: "Limited: needs structured prompts and plugins",
      },
    },
    {
      feature: "Automatic Report Generation",
      datalumio: { icon: "check", text: "Yes, automated report generation" },
      chatgpt: { icon: "cross", text: "No, needs manual formatting" },
    },
    {
      feature: "Visual Output (Charts, Tables)",
      datalumio: { icon: "check", text: "Yes — included in reports" },
      chatgpt: {
        icon: "cross",
        text: "No, only text-based unless prompted specifically",
      },
    },
    {
      feature: "User Interface",
      datalumio: { icon: "check", text: "User-friendly web app interface" },
      chatgpt: { icon: "warning", text: "Chat interface" },
    },
    {
      feature: "Requires Prompt Engineering",
      datalumio: { icon: "check", text: "No" },
      chatgpt: { icon: "cross", text: "Yes" },
    },
    {
      feature: "Target Users",
      datalumio: {
        icon: "check",
        text: "Researchers, analysts, students, teams",
      },
      chatgpt: {
        icon: "warning",
        text: "General public, developers, support users",
      },
    },
    {
      feature: "Structured Output Format",
      datalumio: { icon: "check", text: "Yes – structured, ready to export" },
      chatgpt: { icon: "cross", text: "No, unstructured unless guided" },
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "check":
        return (
          <CheckCircleIcon
            sx={{ color: "#00C853", verticalAlign: "middle", mr: 1 }}
          />
        );
      case "cross":
        return (
          <CancelIcon
            sx={{ color: "#D32F2F", verticalAlign: "middle", mr: 1 }}
          />
        );
      case "warning":
        return (
          <WarningAmberIcon
            sx={{ color: "#FFA000", verticalAlign: "middle", mr: 1 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ background: "#E8F4F9" }}>
      <Text
        variant="h2"
        sx={{
          // mt: 2,
          py: 6,
          fontSize: "24px",
          color: "#0B3235",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        DataLumio Vs ChatGPT
      </Text>

      <Box
        sx={{
          mx: { xs: "20px", sm: "65px" },
          borderRadius: "32px",
          background: "#FFFFFF",
          pt: 3,
          px: { xs: 1, sm: 3 },
          pb: 2,
        }}
      >
        <TextPop
          sx={{
            fontSize: "18px",
            fontStyle: "italic",
            color: "#333333",
            textAlign: "center",
          }}
        >
          LLMs are smart — but they’re not built for research. DataLumio is.
        </TextPop>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#F9AE80",
                    fontFamily: "Poppins",
                    fontSize: "20px",
                  }}
                >
                  Feature
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#F9AE80",
                    fontFamily: "Poppins",
                    fontSize: "20px",
                  }}
                >
                  DataLumio
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    backgroundColor: "#F9AE80",
                    fontFamily: "Poppins",
                    fontSize: "20px",
                  }}
                >
                  ChatGPT
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
                    {row.feature}
                  </TableCell>
                  <TableCell>
                    {getIcon(row.datalumio.icon)}
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ fontFamily: "Poppins" }}
                    >
                      {row.datalumio.text}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getIcon(row.chatgpt.icon)}
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ fontFamily: "Poppins" }}
                    >
                      {row.chatgpt.text}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TextPop
        sx={{
          textAlign: "center",
          color: "#333333",
          fontStyle: "italic",
          my: 5,
        }}
      >
        Built for researchers. No prompts. Just insights.
      </TextPop>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            padding: { xs: "12px 30px", sm: "14px 46px" },
            background: "#F9AE80",
            color: "#0A3235",
            // my: { xs: 1, sm: 2 },
            fontSize: { xs: "12px", sm: "16px" },
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            fontStyle: "italic",
            textTransform: "capitalize",
            "&:hover": { background: "#84F052" },
            mb: 10,
          }}
        >
          Want to try it yourself? Get started
        </Button>
      </Box>
    </Box>
  );
};

export default Comparison;
