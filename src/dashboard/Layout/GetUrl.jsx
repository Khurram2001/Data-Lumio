import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

function GetUrl() {
  const { pathname } = useLocation();
  const regex = /\/([^\/]+)$/;
  const match = pathname.match(regex);
  const url = match[1];

  const getTab = useMemo(() => {
    if (url === "analysis") {
      return "analysis";
    } else if (url === "subscription") {
      return "subscription";
    } else if (url === "profile") {
      return "profile";
    } else if (url === "plan") {
      return "plan";
    } else {
      return "";
    }
  }, [pathname]);

  return getTab;
}

export default GetUrl;
