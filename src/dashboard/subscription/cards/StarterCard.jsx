import {
   Cancel,
   Layers,
   PriceCheck,
   RepeatOneTwoTone,
} from "@mui/icons-material";
import {
   Box,
   Button,
   Dialog,
   DialogContent,
   Stack,
   ToggleButton,
   ToggleButtonGroup,
   Typography,
   CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   BtnStarterSub,
   BtnSub,
   BtnSubscribed,
   PlanCard,
   PriceTitle,
   SubTitle,
   Text,
} from "./styles";
import Repo from "../../../repo/Repo";
import Toast from "../../../Toast";
import { getUser } from "../../userSlice";
import { Features } from "./features";

function StarterCard({
   onSelect,
   billingPeriod,
   handleBillingPeriodChange,
   analysisType,
   setAnalysisType,
}) {
   const { user } = useSelector((state) => state.user);
   const cancelSubscription = user?.cancelSubscription;
   const [modal, setModal] = useState(false);
   const toggleCancel = () => setModal((prev) => !prev);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   // Pricing and features for each type
   const singleAnalysis = {
      price: "$5",
      key: "lumio-starter-2",
      features: [
         "1 analysis/payment",
         "5 files / analysis",
         "Qualitative & quantitative support",
         "Advanced visual reports",
         "Export in Docx",
         "Email support",
      ],
   };
   const multiAnalysis = {
      price: "$10",
      key: "starter", // your existing key
      features: [
         "Upto 3 analysis /payment",
         "5 files / analysis",
         "Qualitative & quantitative support",
         "Advanced visual reports",
         "Export in Docx",
         "Email support",
      ],
   };
   const current = analysisType === "single" ? singleAnalysis : multiAnalysis;

   const getPrice = () => {
      return "$10";
   };
   const handleCancel = async () => {
      try {
         setLoading(true);

         let { data } = await Repo.CancelSubscription({
            request: {
               method: "cancelSubscription",
               data: {
                  email: localStorage.getItem("email"),
               },
            },
         });
         if (data.response.status.statusCode == 200) {
            Toast("success", "Subscription Cancelled");
            dispatch(getUser());
            setLoading(false);
            toggleCancel();
         } else {
            Toast("error", "Error");
            setLoading(false);
            toggleCancel();
         }
      } catch (err) {
         console.log("err:", err);
         setLoading(false);
         toggleCancel();
      }
   };
   return (
      <PlanCard
         spacing={1.6}
         sx={{
            pb: "10px",
            justifyContent: !user ? "space-around" : "space-between",
         }}
      >
         <Stack spacing={1}>
            <Stack spacing={1} alignItems={"center"}>
               <SubTitle>
                  <Layers sx={{ marginRight: "4px" }} />
                  Starter
               </SubTitle>
               <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="center"
               >
                  <PriceTitle
                     sx={{
                        fontSize: "2.25rem",
                     }}
                  >
                     {current.price}
                  </PriceTitle>
               </Stack>
               <PriceTitle sx={{ color: "#A2B0B7", fontSize: "15px" }}>
                  One-time payment
               </PriceTitle>
               <Box
                  justifyContent={"center"}
                  direction="row"
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     width: "100% ",
                  }}
               >
                  <PriceTitle
                     sx={{
                        fontWeight: "700",
                        fontSize: "13px",
                        color: "#0A3235",
                     }}
                  >
                     Perfect for individuals and students getting started with
                     data analysis.
                  </PriceTitle>
               </Box>
               {/* Toggle for Single/Multi */}
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     mb: 2,
                     mt: 1,
                  }}
               >
                  <ToggleButtonGroup
                     value={analysisType}
                     exclusive
                     onChange={(_, val) => val && setAnalysisType(val)}
                     aria-label="analysis type"
                     sx={{ height: "30px" }}
                  >
                     <ToggleButton
                        value="single"
                        aria-label="single"
                        sx={{
                           fontFamily: "Poppins",
                           fontWeight: 500,
                           color: "#0A3235",
                           fontSize: "14px",
                           px: 1.375,
                           "&.Mui-selected": {
                              color: "#0A3235",
                              backgroundColor: "#E0E0E0",
                              "&:hover": { backgroundColor: "#E0E0E0" },
                           },
                        }}
                     >
                        Single
                     </ToggleButton>
                     <ToggleButton
                        value="multi"
                        aria-label="multi"
                        sx={{
                           fontFamily: "Poppins",
                           fontWeight: 500,
                           color: "#0A3235",
                           fontSize: "14px",
                           px: 1.375,
                           "&.Mui-selected": {
                              color: "#0A3235",
                              backgroundColor: "#E0E0E0",
                              "&:hover": { backgroundColor: "#E0E0E0" },
                           },
                        }}
                     >
                        Multi
                     </ToggleButton>
                  </ToggleButtonGroup>
               </Box>
            </Stack>
         </Stack>
         <Box sx={{ display: "flex", justifyContent: "center" }}>
            {user && user?.plan?.includes("starter") ? (
               <BtnSubscribed
                  disabled
                  sx={{ marginBottom: "10px", marginRight: "10px" }}
               >
                  <Text sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                     Purchased
                  </Text>
               </BtnSubscribed>
            ) : (
               <BtnStarterSub
                  variant="contained"
                  onClick={() => onSelect(current.key, "one-time")}
                  sx={{ marginBottom: "10px", background: "1E4F6B" }}
               >
                  <Text sx={{ fontSize: "16px", color: "white" }}>
                     Choose Plan
                  </Text>
               </BtnStarterSub>
            )}
         </Box>
         <Dialog open={modal} onClose={toggleCancel}>
            <DialogContent>
               <Stack alignItems="center" justifyContent="center" spacing={3}>
                  <Cancel sx={{ color: "#353535CC", fontSize: "60px" }} />
                  <Typography variant="h6" align="center">
                     Are you sure you want to cancel your subscription? You will
                     have access to your subscription till the end of your
                     billing cycle.
                  </Typography>

                  {loading ? (
                     <CircularProgress size={20} sx={{ marginRight: 1 }} />
                  ) : (
                     <Button
                        variant="contained"
                        sx={{
                           textTransform: "none",
                           background: "#353535CC !important",
                        }}
                        onClick={handleCancel}
                     >
                        Cancel Subscription
                     </Button>
                  )}
               </Stack>
            </DialogContent>
         </Dialog>
      </PlanCard>
   );
}

export default StarterCard;
