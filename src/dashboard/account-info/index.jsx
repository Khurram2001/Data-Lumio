import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
   Stack,
   Tabs,
   Tab,
   CircularProgress,
   Typography,
   Box,
} from "@mui/material";
import ProfileSection from "./ProfileSection";
import HistorySection from "./HistorySection";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../userSlice";

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
}

function BasicTabs() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [value, setValue] = useState(0);
   const { user, loading } = useSelector((state) => state.user);
   const [error, setError] = useState(null);

   useEffect(() => {
      if (!user) {
         setError(null);
         dispatch(getUser())
            .unwrap()
            .catch(() =>
               setError("Failed to load user data. Please reload the page.")
            );
      }
   }, [user, dispatch]);

   const handleChange = (event, newValue) => {
      setValue(newValue);
      // If Profile tab is selected, refresh user data
      if (newValue === 0) {
         dispatch(getUser())
            .unwrap()
            .catch(() =>
               setError("Failed to load user data. Please reload the page.")
            );
      }
   };

   if (loading) {
      return (
         <Box
            sx={{
               minHeight: "60vh",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <CircularProgress />
         </Box>
      );
   }

   if (error) {
      return (
         <Box
            sx={{
               minHeight: "60vh",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <Typography color="error">{error}</Typography>
         </Box>
      );
   }

   return (
      <Box sx={{ width: "100%" }}>
         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
               value={value}
               onChange={handleChange}
               aria-label="basic tabs example"
               TabIndicatorProps={{
                  style: { backgroundColor: "#b4bf52" }, // 👈 indicator color change
               }}
               sx={{
                  "& .MuiTab-root": {
                     color: "#b4bf52", // 👈 normal tab text color
                     fontWeight: 500,
                  },
                  "& .Mui-selected": {
                     color: "#52F064 !important", // 👈 selected tab color
                  },
               }}
            >
               <Tab label="Profile" {...a11yProps(0)} />
               <Tab label="History" {...a11yProps(1)} />
            </Tabs>
         </Box>
         <TabPanel value={value} index={0}>
            <ProfileSection user={user} />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <HistorySection user={user} />
         </TabPanel>
      </Box>
   );
}

export default BasicTabs;
