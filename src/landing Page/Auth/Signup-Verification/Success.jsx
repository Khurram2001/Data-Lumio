import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const Success = () => {
   const navigate = useNavigate();

   const handleBackToLogin = () => {
      navigate("/login");
   };

   return (
      <Box
         sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0A3235",
            px: 2,
         }}
      >
         <Box
            sx={{
               width: "100%",
               maxWidth: 480,
               textAlign: "center",
               backgroundColor: "#ffffff",
               borderRadius: 3,
               p: { xs: 4, sm: 6 },
               boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
         >
            <CheckCircleIcon sx={{ fontSize: 80, color: "#0B8C8A", mb: 2 }} />
            <Typography
               variant="h4"
               sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  color: "#0A3235",
                  mb: 1,
               }}
            >
               Email Verified!
            </Typography>
            <Typography
               variant="body1"
               sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  color: "#4C4C4C",
                  mb: 3,
               }}
            >
               Your account has been successfully verified. You can now log in.
            </Typography>
            <Button
               variant="contained"
               onClick={handleBackToLogin}
               fullWidth
               sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  textTransform: "capitalize",
                  backgroundColor: "#0B8C8A",
                  borderRadius: "8px",
                  py: 1.3,
                  fontSize: "16px",
                  boxShadow: "none",
                  "&:hover": {
                     backgroundColor: "#0A6F6D",
                     boxShadow: "none",
                  },
               }}
            >
               Back to Login
            </Button>
         </Box>
      </Box>
   );
};

export default Success;
