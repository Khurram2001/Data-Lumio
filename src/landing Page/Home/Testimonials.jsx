import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { Box, Typography, Avatar, Rating, Stack } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Maya from "../../assets/images/maya.png";
import James from "../../assets/images/james.png";
import Rina from "../../assets/images/Rina.jpg";
import { Text } from "../Home/index";
import { TextPop } from "../Home/index";

const testimonials = [
  {
    name: "Maya Collins",
    title: "Social Science Researcher",
    text: "DataLumio saved me hours of manual coding. I uploaded transcripts from 12 interviews, and within minutes, I had a clean, visual summary of recurring themes. It’s like having a personal research assistant!",
    avatar: Maya,
  },
  {
    name: "James Ortega",
    title: "Program Manager",
    text: "I’m not a data expert, but DataLumio made it easy to analyze survey results for our non-profit project. The charts and summaries were clear, accurate, and presentation-ready.",
    avatar: James,
  },
  {
    name: "Rina Patel",
    title: "Product Analyst, BrightCore Tech",
    text: "We used DataLumio to crunch numbers from our recent product feedback forms. The insights helped us pivot fast and the visual reports impressed our leadership team.",
    avatar: Rina,
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000, // changed from 4000 to 3000ms
    dots: false,
    arrows: false,
    infinite: true,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ position: "relative", py: 6, backgroundColor: "#003333" }}>
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
          What Our Users Are Saying About DataLumio
        </Text>
      </Box>

      <TextPop
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          textAlign: "center",
          mt: 3,
          mb: 8,
        }}
      >
        Trusted by researchers, analysts, and educators who rely on DataLumio
        for fast, frustration-free insights
      </TextPop>
      <Box
        sx={{
          ".slick-slider": {
            overflow: "hidden",
          },
          ".slick-track": {
            display: "flex",
            gap: 7,
            ml: { xs: -2, md: 25 },
          },
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((t, i) => (
            <Box
              key={i}
              sx={{
                p: 4,
                backgroundColor: "#fff",
                opacity: i === currentSlide ? 1 : 0.5,
                borderRadius: 4,
                height: 480,
                width: 500,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                transition: "all 0.3s ease",
                mx: 1,
                position: "relative",
              }}
            >
              {i === currentSlide && (
                <>
                  <WestIcon
                    onClick={() => sliderRef.current?.slickPrev()}
                    sx={{
                      position: "absolute",
                      left: -55,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 40,
                      color: "#FFFFFF",
                      marginLeft: "10px",
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                  />
                  <EastIcon
                    onClick={() => sliderRef.current?.slickNext()}
                    sx={{
                      position: "absolute",
                      right: -50,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 40,
                      color: "#FFFFFF",
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                  />
                </>
              )}
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Top: Quote and Avatar */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mb: 2,
                  }}
                >
                  <FormatQuoteIcon sx={{ fontSize: 65, color: "#000000" }} />
                  <Avatar
                    src={t.avatar}
                    alt={t.name}
                    sx={{ width: 90, height: 90 }}
                  />
                </Box>

                {/* Text */}
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: "#626262",
                    mb: 1,
                    my: 3,
                    textAlign: "left",
                  }}
                >
                  {t.text}
                </Typography>

                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Rating */}
                  <Rating
                    value={5}
                    readOnly
                    sx={{ mb: 2, marginTop: "auto" }}
                  />
                </Box>

                <Stack direction={"column"} marginTop={"auto"}>
                  {/* Name */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: "22px",
                      color: "#000000",
                      mt: 1,
                    }}
                  >
                    {t.name}
                  </Typography>

                  {/* Title */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#21967B",
                      fontWeight: 500,
                      fontSize: "15px",
                      mt: 0.5,
                    }}
                  >
                    {t.title}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Testimonials;
