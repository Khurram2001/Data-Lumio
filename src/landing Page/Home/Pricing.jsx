import {
   Box,
   Typography,
   Stack,
   Card,
   CardContent,
   Button,
   Switch,
   FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
   const [yearly, setYearly] = useState(false);
   const navigate = useNavigate();

   const planPrices = {
      Starter: "$10",
      Pro: yearly ? "$313" : "$29",
      Enterprise: yearly ? "$1080" : "$100",
   };

   const planPeriods = {
      Starter: "/one-time",
      Pro: yearly ? "/year" : "/month",
      Enterprise: yearly ? "/year" : "/month",
   };

   const planFeatures = {
      Starter: [
         "Analysis based on payment",
         "Upload 5 files /analysis",
         "Qualitative & quantitative support",
         "Advanced visual reports",
         "Export in Docx",
         "Email support",
      ],
      Pro: [
         yearly ? "Upto 240 analysis /year" : "Upto 20 analysis /month",
         "Upload 10 files /analysis",
         "Qualitative & quantitative support",
         "Advanced visual reports",
         "Export in Docx",
         "Email support",
      ],
      Enterprise: [
         "Unlimited analysis",
         "Upload 20 files /analysis",
         "Qualitative & quantitative support",
         "Advanced visual reports",
         "Export in Docx",
         "Priority support & SLA",
      ],
   };

   const planDescriptions = {
      Starter:
         "Perfect for individuals and students getting started with data analysis.",
      Pro: "Ideal for researchers and small teams who need regular, deeper insights.",
      Enterprise:
         "Best for organizations and institutions with high-volume analysis needs.",
   };

   const plans = [
      {
         title: "Starter",
         price: planPrices.Starter,
         period: planPeriods.Starter,
         description: planDescriptions.Starter,
         features: planFeatures.Starter,
         buttonText: "Get Started",
         buttonColor: "#0F2C2C",
         bg: "#ffffff",
         textColor: "#000",
      },
      {
         title: "Pro",
         price: planPrices.Pro,
         period: planPeriods.Pro,
         description: planDescriptions.Pro,
         features: planFeatures.Pro,
         buttonText: "Upgrade To Pro",
         buttonColor: "#ffffff",
         bg: "#F2C94C",
         textColor: "#000",
      },
      {
         title: "Enterprise",
         price: planPrices.Enterprise,
         period: planPeriods.Enterprise,
         description: planDescriptions.Enterprise,
         features: planFeatures.Enterprise,
         buttonText: "Contact Sales",
         buttonColor: "#ffffff",
         bg: "#6FCF97",
         textColor: "#000",
      },
   ];

   return (
      <main>
         <Box sx={{ width: "100%" }}>
            {/* Top Heading */}
            <Box sx={{ py: 2, width: "100%", background: "#22464980" }}>
               <Typography
                  variant="h1"
                  sx={{
                     textAlign: "center",
                     fontSize: { xs: "28px", sm: "32px" },
                     color: "#F0CB52",
                     fontWeight: 700,
                  }}
               >
                  DataLumio Pricing
               </Typography>
            </Box>

            {/* Subheading */}
            <Typography
               sx={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#EAEAEA",
                  fontWeight: 500,
                  width: "100%",
                  my: 3,
               }}
            >
               Ready to get started ? - Powerful insights, flexible pricing.
               Find the plan that fits your team.
            </Typography>

            {/* Toggle Monthly/Yearly */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
               <FormControlLabel
                  control={
                     <Switch
                        checked={yearly}
                        onChange={() => setYearly(!yearly)}
                     />
                  }
                  label={yearly ? "Yearly" : "Monthly"}
                  labelPlacement="start"
                  sx={{ color: "#fff" }}
               />
            </Box>

            {/* Pricing Cards */}
            <Stack
               direction={"row"}
               gap={4.5}
               justifyContent="center"
               alignItems="start"
               flexWrap={"wrap"}
               sx={{ px: { xs: "20px", sm: "50px" }, pb: 6 }}
            >
               {plans.map((plan, index) => (
                  <Box key={index} sx={{ height: "600px" }}>
                     <Card
                        sx={{
                           width: { xs: "100%", sm: "350px" },
                           height: "100%",
                           backgroundColor: plan.bg,
                           color: plan.textColor,
                           borderRadius: 3,
                           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                           px: 3,
                           display: "flex",
                           flexDirection: "column",
                           position: "relative",
                        }}
                     >
                        <CardContent
                           sx={{
                              display: "flex",
                              flexDirection: "column",
                              flex: 1,
                           }}
                        >
                           {/* Title */}
                           <Typography
                              variant="h6"
                              sx={{
                                 fontWeight: 700,
                                 mb: 1,
                                 color: plan.textColor,
                              }}
                           >
                              {plan.title}
                           </Typography>

                           {/* Price */}
                           <Typography
                              variant="h4"
                              sx={{ fontWeight: 900, color: "#0A3235" }}
                           >
                              {plan.price}
                           </Typography>

                           {/* Description */}
                           <Typography
                              variant="body2"
                              sx={{
                                 mb: 2,
                                 fontSize: "18px",
                                 color: "#0A3235",
                                 fontWeight: 500,
                                 mt: 3,
                              }}
                           >
                              {plan.description}
                           </Typography>

                           {/* Features */}
                           <Box>
                              {plan.features.map((feature, i) => (
                                 <Typography
                                    key={i}
                                    variant="body2"
                                    sx={{ mb: 0.5, color: "#0A3235" }}
                                 >
                                    ✅ {feature}
                                 </Typography>
                              ))}
                           </Box>

                           {/* Button */}
                           <Button
                              variant="contained"
                              fullWidth
                              sx={{
                                 background: plan.buttonColor,
                                 color:
                                    plan.buttonColor === "#ffffff"
                                       ? "#000"
                                       : "#fff",
                                 borderRadius: 2,
                                 py: 1.5,
                                 fontWeight: 600,
                                 textTransform: "none",
                                 mt: "auto",
                                 ":hover": {
                                    opacity: 0.9,
                                    background: plan.buttonColor,
                                 },
                              }}
                              onClick={() => navigate("/login")}
                           >
                              {plan.buttonText}
                           </Button>
                        </CardContent>
                     </Card>
                  </Box>
               ))}
            </Stack>
         </Box>
      </main>
   );
};

export default Pricing;
