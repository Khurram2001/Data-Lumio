import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, FormControl, Input } from "@mui/material";
import {
  DialogContent,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import Repo from "../../repo/Repo";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  baseURL,
  proMonthlyLookupKey,
  proYearlyLookupKey,
  starterMonthlyLookupKey,
  starterYearlyLookupKey,
} from "../../repo/Repository";
import Toast from "../../Toast";
import { getUser } from "../userSlice";
import axios from "axios";

export default function NewPayment({ onClose, plan, billing }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("plan:", plan);
  console.log("billing:", billing);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  console.log("user:", user);
  const location = useLocation();

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true);
      try {
        await dispatch(getUser()); // assuming it returns a promise
      } catch (err) {
        console.error("User fetch failed:", err);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  // const getUser = async () => {
  //   const email = localStorage.getItem("email");
  //   if (!email) return;

  //   try {
  //     setLoading(true);
  //     const { data } = await axios.post(`${baseURL}/get-user`, { email });

  //     // Save user and customer ID locally
  //     setUsers(data);
  //     if (data?.customer_id) {
  //       setCustomerId(data.customer_id);
  //       localStorage.setItem("customerId", data.customer_id);
  //     } else {
  //       localStorage.removeItem("customerId");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     setUsers(null);
  //     setCustomerId(null);
  //     localStorage.removeItem("customerId");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Use correct lookup key for single analysis
      let lookupKey = "";
      if (plan === "starter") {
        lookupKey = "lumio-starter";
      } else if (plan === "lumio-starter-2") {
        lookupKey = "lumio-starter-2";
      } else if (billing === "yearly" && plan === "pro") {
        lookupKey = proYearlyLookupKey;
      } else if (billing === "monthly" && plan === "pro") {
        lookupKey = proMonthlyLookupKey;
      } else {
        lookupKey = proMonthlyLookupKey;
      }

      const email = localStorage.getItem("email");
      const customer_id = localStorage.getItem("customerId");

      const payload = {
        email,
        lookup_key: lookupKey,
        ...(customer_id && { customer_id }),
      };

      const { data } = await Repo.CreateCheckOutSession(payload);
      console.log("DATA", data);

      setLoading(false);
      window.location.href = data.url;
      onClose();
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            rowGap: "16px",
          }}
        >
          <Stack direction="row" alignItems="center" spacing="8px">
            <Typography color="#14224B">Package :- </Typography>
            <Typography sx={{ color: "#14224B", fontWeight: 600 }}>
              {plan === "starter"
                ? "STARTER"
                : plan === "lumio-starter-2"
                ? "SINGLE ANALYSIS"
                : plan === "pro"
                ? "PRO"
                : "ENTERPRISE"}
            </Typography>
          </Stack>
          <Typography color="#14224B" fontWeight={600}>
            {plan === "starter"
              ? "$10 (one-time payment)"
              : plan === "lumio-starter-2"
              ? "$5 (single analysis)"
              : billing === "yearly" && plan === "pro"
              ? "$313 / yearly"
              : billing === "monthly" && plan === "pro"
              ? "$29 / month"
              : ""}
          </Typography>
          <Typography
            color="#14224B"
            fontWeight={600}
            width={"100%"}
            fontFamily={"Poppins"}
            // fontSize={"14px"}
          >
            Important:
          </Typography>
          <Typography
            color="#14224B"
            mt={-1.5}
            fontFamily={"Poppins"}
            // fontSize={"14px"}
          >
            To ensure your plan is updated correctly, please allow the system to
            fully redirect you back to DataLumio after completing your payment
            on the checkout page. If you close the tab or interrupt the process,
            your plan might not update properly, and you may need to log out and
            log back in to resolve the issue.
          </Typography>
          {/* {loading && <CircularProgress size={20} sx={{ marginRight: 1 }} />} */}
          {loading || userLoading ? (
            <CircularProgress size={20} sx={{ marginRight: 1 }} />
          ) : (
            // {!loading && (
            <Button
              id="checkBtn"
              fullWidth
              variant="contained"
              sx={{
                background: "#F0CB52",
                color: "#0A3235",
                // my: { xs: 1, sm: 2 },
                fontWeight: 600,
                fontFamily: "Poppins",
                textTransform: "capitalize",
                "&:hover": { background: "#84F052" },
                transition: "all 0.3s ease-in-out",
              }}
              onClick={handleSubmit}
            >
              Checkout
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
