import { Box, Button, useMediaQuery } from "@mui/material";
import React from "react";
import { Text } from "../Home/index";
import { TextPop } from "../Home/index";
import GetStartedImg from "../../assets/images/get-startedImg.png";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();
  const isVerySmallMobile = useMediaQuery("(max-width:400px)");
  const isLargeDevice = useMediaQuery(
    "(min-width:1150px) and (min-height:650px)"
  );

  return (
    <>
      {/* Entire Section Wrapper */}
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            height: {
              xs: isVerySmallMobile ? "85vh" : "60vh",
              sm: "70vh",
              md: isLargeDevice ? "78vh" : "100vh",
            },
            position: "relative",
          }}
        >
          {/* Text Section */}
          <Box
            sx={{
              height: { xs: "45%", sm: "55%", md: "60%" },
              backgroundColor: "#F0CB52",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              textAlign: "center",
              borderRadius: {
                xs: "30px",
                sm: "40px",
                md: "80px",
                lg: "220px",
              },
              px: { xs: 1, sm: 3 },
              py: 3,
              mb: 2,
            }}
          >
            <Text
              sx={{
                fontSize: { xs: 20, sm: 24 },
                fontWeight: 700,
                color: "#0A3235",
                mb: 1,
              }}
            >
              Turn Your Data Into Insights — Fast
            </Text>
            <TextPop
              sx={{
                fontSize: { xs: 16, sm: 18 },
                fontWeight: 500,
                color: "#0A3235",
                mb: 4,
                maxWidth: "80%",
              }}
            >
              Join thousands of researchers and analysts using DataLumio to
              analyze faster, collaborate better, and uncover insights
              effortlessly.
            </TextPop>
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: "80%", sm: "68%" },
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "100%", sm: "90%", md: "auto" },
              height: { xs: "50%", sm: "50%", md: "auto" },
              boxShadow: 3,
              borderRadius: { xs: "0px", sm: "24px" },
            }}
          >
            <Box
              component="img"
              src={GetStartedImg}
              alt="Team analyzing data"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: { xs: "cover", sm: "fill", md: "contain" },
                borderRadius: "inherit",
              }}
            />
          </Box>

          {/* Floating Button */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: "113%", sm: "101%" },
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              width: { xs: "100%", sm: "40%" },
              px: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                padding: { xs: "12px 30px", sm: "14px 46px" },
                background: "#F0CB52",
                color: "#0A3235",
                width: "100%",
                fontSize: { xs: "12px", sm: "16px" },
                borderRadius: "10px",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontStyle: "italic",
                textTransform: "capitalize",
                boxShadow: 3,
                "&:hover": { background: "#84F052" },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>

        {/* Space After Floating Button */}
        <Box sx={{ height: { xs: "80px", sm: "120px" } }} />
      </Box>
    </>
  );
};

export default GetStarted;
