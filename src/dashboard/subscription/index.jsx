import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Confirmation from "./Confirmation";
import NewPayment from "./NewPayment";
import UpdatePackage from "./UpdatePackage";
import Cards from "./cards/index";
import { getUser } from "../userSlice";
const RootStyle = styled(Box)({
  minHeight: "100%",
  marginTop: "20px",
});

function Subscription() {
  const urlSearchParams = new URLSearchParams(window.location.href);
  const session_id = urlSearchParams.get("session_id");
  const { user } = useSelector((state) => state.user);
  console.log("User", user);
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState(session_id);
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    open: false,
    pay: false,
    plan: "",
    user: {},
    subscribed: false,
    billingPeriod: "yearly",
  });
  console.log("State main", state);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, []);

  const sessionToggle = () => {
    setSessionId(null);
  };

  const toggle = (arg, billingPeriod) => {
    let standard = arg;
    let billing = billingPeriod;
    console.log("billing:", billing);
    // Handle both 'starter' and 'lumio-starter-2' as payment plans
    if (arg === "starter" || arg === "lumio-starter-2") {
      setState((prev) => ({
        ...prev,
        pay: !prev.pay,
        plan: standard,
        billingPeriod: "one-time",
      }));
    } else if (arg === "pro") {
      setState((prev) => ({
        ...prev,
        pay: !prev.pay,
        plan: standard,
        billingPeriod: billing,
      }));
    } else if (arg === "subscribed") {
      setState((prev) => ({
        ...prev,
        subscribed: !prev.subscribed,
        plan: "starter",
      }));
    } else {
      setState((prev) => ({ ...prev, open: !prev.open, plan: standard }));
    }
  };

  const close = () => {
    setState((prev) => ({ ...prev, pay: !prev.pay, plan: "" }));
  };

  return (
    <Box>
      <RootStyle>
        <Cards onSelect={toggle} />
      </RootStyle>
      {state.pay && (
        <NewPayment
          onClose={() => close()}
          plan={state.plan}
          billing={state.billingPeriod}
        />
      )}
      {sessionId && <Confirmation onClose={sessionToggle} id={sessionId} />}
      {state.subscribed && (
        <UpdatePackage
          plan={state.plan}
          open={state.subscribed}
          onClose={() => toggle("subscribed")}
        />
      )}
    </Box>
  );
}

export default Subscription;
