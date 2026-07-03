import React from "react";
import { Text } from "../Home/index";
import { TextPop } from "../Home/index";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisualReportImg from "../../assets/images/visual-reports.png";
import NoCodeImg from "../../assets/images/no-code.png";
import AutomateImg from "../../assets/images/automate-workflow.png";

const HomeSection = () => {
  const navigate = useNavigate();

  const boxData = [
    {
      img: VisualReportImg,
      width: "180px",
      title: "Instant visual reports",
      description: "From raw data to results in minutes",
      bg: "#FFFFFF1A",
    },
    {
      img: AutomateImg,
      width: "180px",
      title: "Automate your workflow",
      description: "AI analyzes, you focus on the insights",
      bg: "#0F484C",
    },
    {
      img: NoCodeImg,
      width: "180px",
      title: "No code, no stress",
      description: "Built for researchers, students and teams",
      bg: "#FFFFFF1A",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        py: 6,
        // px: { xs: "20px", sm: "65px" },
      }}
    >
      <Text
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: { xs: "28px", sm: "32px" },
          color: "#F0CB52",
          fontWeight: 700,
          mb: 4,
        }}
      >
        Analyze Your Data in Seconds
      </Text>

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={4}
        justifyContent="center"
        pb={6}
      >
        {boxData.map((box, index) => (
          <Box
            key={index}
            sx={{
              flex: {
                xs: "1 1 100%", // Full width on small screens
                sm: "1 1 45%", // Two per row on tablets
                md: "1 1 30%", // Three per row on desktop
              },
              maxWidth: { xs: "100%", sm: "50%", md: "33%" },
              py: 2.5,
              px: 2,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              alignItems: "center",
              background: box.bg,
              borderRadius: "16px",
              flexDirection: "column",
            }}
          >
            <img src={box.img} alt={box.title} width={box.width} />
            <TextPop sx={{ fontWeight: 700 }}>{box.title}</TextPop>
            <TextPop sx={{ fontSize: "15px" }}>{box.description}</TextPop>
          </Box>
        ))}
      </Stack>

      <TextPop
        sx={{
          textAlign: "center",
          color: "#52F064",
          fontStyle: "italic",
        }}
      >
        No setup, no hassle—just upload your data and get your questions
        answered.
      </TextPop>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            padding: { xs: "7px 30px", sm: "14px 66px" },
            background: "#F0CB52",
            color: "#0A3235",
            // my: { xs: 1, sm: 2 },
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            textTransform: "capitalize",
            "&:hover": { background: "#84F052" },
          }}
        >
          Try DataLumio Now!
        </Button>
      </Box>
    </Box>
  );
};

export default HomeSection;
