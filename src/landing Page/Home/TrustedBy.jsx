import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Text } from "../Home/index";
import { TextPop } from "../Home/index";
import AcademicImg from "../../assets/images/academic-img.png";
import BusinessImg from "../../assets/images/business-img.png";
import MarketImg from "../../assets/images/market-img.png";
import EducatorImg from "../../assets/images/educator-img.png";
import NonProfitImg from "../../assets/images/non-profit-img.png";

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: "350px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
}));

const Title = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: "22px",
  marginBottom: "8px",
});
const CardText = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "24px",
});

const cardOneData = [
  {
    title: "Academic Researchers",
    text: "Analyze interview transcripts, survey results, and literature data without manual coding.",
    image: AcademicImg,
    bg: "#0F3F4C",
  },
  {
    title: "Business Teams",
    text: "Use internal surveys, customer feedback, or operational data to improve strategy and efficiency.",
    image: BusinessImg,
    bg: "#0F484C",
  },
  {
    title: "Market Analysts",
    text: "Turn raw consumer feedback and performance metrics into actionable insights fast.",
    image: MarketImg,
    bg: "#0F3F4C",
  },
];

const cardTwoData = [
  {
    title: "Educators and Students",
    text: "Simplify qualitative and quantitative analysis for thesis projects, papers, and class research.",
    image: EducatorImg,
    bg: "#0F4C45",
    text2nd:
      "Whether you're preparing a thesis, analyzing class surveys, or reviewing academic literature, DataLumio helps streamline every step. No complex tools — just fast, accurate insights tailored for academic success.",
    bg2nd: "#0F484C",
  },
  {
    title: "Non-Profits and NGOs",
    text: "Evaluate program data and beneficiary feedback to guide decision-making and reporting.",
    image: NonProfitImg,
    bg: "#0F4C45",
    text2nd:
      "From community surveys to impact assessments, DataLumio empowers teams to turn field data into clear, actionable insights—helping nonprofits make informed decisions and demonstrate their value with confidence.",
    bg2nd: "#0F484C",
  },
];

const TrustedBy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md = 900px

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ py: 2, width: "100%", background: "#22464980" }}>
        <Text
          variant="h1"
          sx={{
            textAlign: "center",
            fontSize: { xs: "28px", sm: "32px" },
            color: "#F0CB52",
            fontWeight: 700,
          }}
        >
          Who Is DataLumio For?
        </Text>
      </Box>

      <TextPop
        sx={{ fontSize: "18px", fontWeight: 500, textAlign: "center", mt: 3 }}
      >
        Trusted by researchers, analysts, and educators who rely on DataLumio
        for fast, frustration-free insights
      </TextPop>

      <Stack
        px={{ xs: "20px", sm: "65px" }}
        direction={"row"}
        gap={4}
        my={7}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          gap={4}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {cardOneData.map((card, index) => (
            <CustomCard key={index} sx={{ background: card.bg }}>
              <img
                src={card.image}
                alt={card.title}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5, // Add more space between title and text
                  px: 3,
                  pb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Title
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      textAlign: "center",
                      color: "#52F064",
                      mt: 2,
                    }}
                  >
                    {card.title}
                  </Title>
                  <CardText
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#EAEAEA",
                      mb: 2,
                    }}
                  >
                    {card.text}
                  </CardText>
                </Box>
              </CardContent>
            </CustomCard>
          ))}
        </Stack>

        <Stack
          direction={"row"}
          gap={4}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {cardTwoData.map((card, index) => (
            <Stack
              key={`stack-${index}`}
              direction={"row"}
              gap={4}
              flexWrap={"wrap"}
              justifyContent={"center"}
            >
              <CustomCard
                // key={index}
                key={`main-${index}`}
                sx={{
                  background: card.bg,
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  p: 0,
                  width: "100%",
                  maxWidth: { md: 739 },
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={card.image}
                  alt={card.title}
                  sx={{
                    width: isMobile ? "100%" : 350,
                    height: isMobile ? 200 : "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    px: 3,
                    py: 2,
                    flex: 1,
                  }}
                >
                  <Title
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      color: "#52F064",
                      textAlign: "center",
                      mt: isMobile ? 2 : 0,
                    }}
                  >
                    {card.title}
                  </Title>
                  <CardText
                    variant="body2"
                    sx={{
                      color: "#EAEAEA",
                      textAlign: "center",
                      mb: isMobile ? 2 : 0,
                    }}
                  >
                    {card.text}
                  </CardText>
                </CardContent>
              </CustomCard>

              <CustomCard
                // key={index}
                key={`second-${index}`}
                sx={{ background: card.bg2nd }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <CardText
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#EAEAEA",
                      mb: 2,
                    }}
                  >
                    {card.text2nd}
                  </CardText>
                </CardContent>
              </CustomCard>
            </Stack>
          ))}
        </Stack>

        <Stack></Stack>
      </Stack>
    </Box>
  );
};

export default TrustedBy;
