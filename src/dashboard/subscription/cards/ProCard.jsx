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

function ProCard({ onSelect, billingPeriod, handleBillingPeriodChange }) {
  const { user } = useSelector((state) => state.user);
  const cancelSubscription = user?.cancelSubscription;
  const [modal, setModal] = useState(false);
  const toggleCancel = () => setModal((prev) => !prev);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getPrice = () => {
    if (billingPeriod === "yearly") {
      return "$313";
    }
    return "$29";
  };

  const handleCancel = async () => {
    try {
      setLoading(true);

      let { data } = await Repo.CancelSubscription({
        email: localStorage.getItem("email"),
      });
      if (data?.status == 200) {
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
            Pro
          </SubTitle>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <PriceTitle sx={{ fontSize: "2.25rem" }}>{getPrice()}</PriceTitle>
            {billingPeriod === "yearly" && (
              <Box
                sx={{
                  "@keyframes blink": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0 },
                    "100%": { opacity: 1 },
                  },
                  animation: "blink 1.5s infinite",
                  background: "#F5F5F5",
                  color: "#0A3235",
                  fontWeight: 700,
                  borderRadius: "8px",
                  padding: "2px 10px",
                  fontSize: "14px",
                  display: "inline-block",
                  ml: 1,
                }}
              >
                Save 10%
              </Box>
            )}
          </Stack>
          <PriceTitle sx={{ color: "#fff", fontSize: "15px" }}>
            Billed {billingPeriod === "yearly" ? "Yearly" : "Monthly"}
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
              sx={{ fontWeight: "700", fontSize: "13px", color: "#0A3235" }}
            >
              Ideal for researchers and small teams who need regular, deeper
              insights.
            </PriceTitle>
          </Box>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ToggleButtonGroup
            value={billingPeriod}
            exclusive
            onChange={handleBillingPeriodChange}
            aria-label="billing period"
            sx={{ height: "30px" }}
          >
            <ToggleButton
              value="monthly"
              aria-label="monthly"
              disabled={
                user && user?.subscription?.price === 99 && !cancelSubscription
              }
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#0A3235",
                "&.Mui-selected": {
                  color: "#0A3235",
                  backgroundColor: "#E0E0E0",
                  "&:hover": { backgroundColor: "#E0E0E0" },
                },
              }}
            >
              Monthly
            </ToggleButton>
            <ToggleButton
              value="yearly"
              aria-label="yearly"
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                color: "#0A3235",
                "&.Mui-selected": {
                  color: "#0A3235",
                  backgroundColor: "#E0E0E0",
                  "&:hover": { backgroundColor: "#E0E0E0" },
                },
              }}
            >
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {user && user?.plan?.includes("pro") ? (
          <Stack direction={"row"} justifyContent={"space-between"}>
            {user?.subscription?.price === 9 && billingPeriod === "yearly" ? (
              <BtnSubscribed
                onClick={() => onSelect("pro", billingPeriod)}
                sx={{
                  marginBottom: "10px",
                  backgroundColor: "#f3f3f3 !important",
                  cursor: "pointer",
                  minWidth: "200px",
                }}
              >
                <PriceCheck
                  sx={{ color: "#353535 !important", marginRight: "10px" }}
                />
                <Text sx={{ fontSize: "16px" }}>Upgrade</Text>
              </BtnSubscribed>
            ) : user?.subscription?.price === 99 &&
              billingPeriod === "yearly" ? (
              <>
                <BtnSubscribed
                  sx={{
                    marginBottom: "10px",
                    marginRight: "10px",
                    backgroundColor: "red !important",
                  }}
                  onClick={toggleCancel}
                >
                  <Text sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                    Cancel
                  </Text>
                </BtnSubscribed>

                {/* Renew Button commented out */}
                {/*
                <BtnSubscribed
                  variant="contained"
                  onClick={() => onSelect("pro", billingPeriod)}
                  sx={{
                    marginBottom: "10px",
                    backgroundColor: "#f3f3f3 !important",
                    cursor: "pointer",
                  }}
                >
                  <RepeatOneTwoTone sx={{ color: "#353535 !important" }} />
                  <Text sx={{ fontSize: "16px" }}>Renew</Text>
                </BtnSubscribed>
                */}
              </>
            ) : (
              <>
                <BtnSubscribed
                  disabled
                  sx={{ marginBottom: "10px", marginRight: "10px" }}
                >
                  <Text sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                    Subscribed
                  </Text>
                </BtnSubscribed>

                {/* Renew Button commented out */}
                {/*
                <BtnSubscribed
                  variant="contained"
                  onClick={() => onSelect("pro", billingPeriod)}
                  sx={{
                    marginBottom: "10px",
                    backgroundColor: "#f3f3f3 !important",
                    cursor: "pointer",
                  }}
                >
                  <RepeatOneTwoTone sx={{ color: "#353535 !important" }} />
                  <Text sx={{ fontSize: "16px" }}>Renew</Text>
                </BtnSubscribed>
                */}
              </>
            )}
          </Stack>
        ) : (
          <BtnSub
            variant="contained"
            onClick={() => onSelect("pro", billingPeriod)}
            sx={{ marginBottom: "10px" }}
          >
            <Text sx={{ fontSize: "16px" }}>Upgrade To Pro</Text>
          </BtnSub>
        )}
      </Box>

      <Dialog open={modal} onClose={toggleCancel}>
        <DialogContent>
          <Stack alignItems="center" justifyContent="center" spacing={3}>
            <Cancel sx={{ color: "#353535CC", fontSize: "60px" }} />
            <Typography variant="h6" align="center">
              Are you sure you want to cancel your subscription? You will have
              access to your subscription till the end of your billing cycle.
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

export default ProCard;
