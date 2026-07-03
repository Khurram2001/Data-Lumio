import React from "react";
import {
   Box,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Typography,
   useMediaQuery,
   styled,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Logo from "../../assets/authIcon.png";
import { useNavigate } from "react-router-dom";
import GetUrl from "./GetUrl";
import { useDispatch } from "react-redux";
import {
   clearAnalysisReport,
   clearUploadedData,
   resetStep,
} from "../analysis/analysisSlice";
import { logout, getUser } from "../userSlice";

// Styled components
export const TextLogo = styled(Typography)({
   fontFamily: "'Space Grotesk', sans-serif",
   fontWeight: 400,
});
export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
   fontWeight: 400,
});

const Sidebar = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const smallHeightLaptop = useMediaQuery(
      "(max-height:700px) and (min-width:600px)"
   );
   const getUrl = GetUrl();

   return (
      <Box
         sx={{
            width: "100%",
            backgroundColor: "#0A3235",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            p: 2,
         }}
      >
         {/* Top Section */}
         <Box>
            <div
               className="flex justify-start items-center gap-3 cursor-pointer px-4 sm:px-3"
               onClick={() => navigate("/welcome")}
            >
               <img
                  src={Logo}
                  alt=""
                  className={`w-7 ${smallHeightLaptop ? "sm:w-8" : "sm:w-9"}`}
               />
               <TextLogo
                  sx={{
                     color: "#F0CB52",
                     fontWeight: 700,
                     fontSize: {
                        xs: "20px",
                        sm: smallHeightLaptop ? "20px" : "22px",
                     },
                  }}
               >
                  DataLumio
               </TextLogo>
            </div>

            <List>
               <ListItemButton
                  onClick={() => navigate("/step-analysis")}
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "6px",
                     mt: { xs: 1, sm: 2 },
                     borderRadius: "8px",
                     backgroundColor:
                        getUrl === "analysis" ? "#032629" : "transparent",
                     "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                        color: getUrl === "analysis" ? "#F0CB52" : "#FFFFFF8F",
                     },
                     "&:hover": {
                        background: "#032629",
                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                           color: "#F0CB52",
                        },
                     },
                  }}
               >
                  <ListItemIcon
                     sx={{
                        color: "#FFFFFF8F",
                        minWidth: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                     }}
                  >
                     <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText
                     primary="Start Analysis"
                     primaryTypographyProps={{
                        sx: {
                           fontFamily: "Poppins, sans-serif",
                           fontSize: {
                              xs: "16px",
                              sm: smallHeightLaptop ? "15px" : "16px",
                           },
                           color: "#FFFFFF8F",
                           fontWeight: 400,
                        },
                     }}
                  />
               </ListItemButton>
            </List>
         </Box>

         {/* Bottom Section */}
         <Box>
            <List
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: { xs: 2, sm: smallHeightLaptop ? 2 : 3 },
               }}
            >
               {/* ✅ Contact Us (Dashboard version) */}
               <ListItemButton
                  onClick={() => navigate("/dashboard/contact-us")}
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "6px",
                     width: "100%",
                     borderRadius: "8px",
                     backgroundColor:
                        getUrl === "contact-us" ? "#032629" : "transparent",
                     "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                        color:
                           getUrl === "contact-us" ? "#F0CB52" : "#FFFFFF8F",
                     },
                     "&:hover": {
                        background: "#032629",
                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                           color: "#F0CB52",
                        },
                     },
                  }}
               >
                  <ListItemIcon
                     sx={{
                        color: "#FFFFFF8F",
                        minWidth: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                     }}
                  >
                     <ContactSupportIcon />
                  </ListItemIcon>
                  <ListItemText
                     primary="Contact Us"
                     primaryTypographyProps={{
                        sx: {
                           fontFamily: "Poppins, sans-serif",
                           fontSize: {
                              xs: "16px",
                              sm: smallHeightLaptop ? "15px" : "16px",
                           },
                           color: "#FFFFFF8F",
                           fontWeight: 400,
                        },
                     }}
                  />
               </ListItemButton>

               {/* Subscription */}
               <ListItemButton
                  onClick={() => navigate("/subscription")}
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "6px",
                     width: "100%",
                     borderRadius: "8px",
                     backgroundColor:
                        getUrl === "subscription" ? "#032629" : "transparent",
                     "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                        color:
                           getUrl === "subscription" ? "#F0CB52" : "#FFFFFF8F",
                     },
                     "&:hover": {
                        background: "#032629",
                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                           color: "#F0CB52",
                        },
                     },
                  }}
               >
                  <ListItemIcon
                     sx={{
                        color: "#FFFFFF8F",
                        minWidth: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                     }}
                  >
                     <DataUsageIcon />
                  </ListItemIcon>
                  <ListItemText
                     primary="Subscription"
                     primaryTypographyProps={{
                        sx: {
                           fontFamily: "Poppins, sans-serif",
                           fontSize: {
                              xs: "16px",
                              sm: smallHeightLaptop ? "15px" : "16px",
                           },
                           color: "#FFFFFF8F",
                           fontWeight: 400,
                        },
                     }}
                  />
               </ListItemButton>

               {/* Account Info */}
               <ListItemButton
                  onClick={() => {
                     dispatch(getUser());
                     navigate("/profile");
                  }}
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "6px",
                     width: "100%",
                     borderRadius: "8px",
                     backgroundColor:
                        getUrl === "profile" ? "#032629" : "transparent",
                     "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                        color: getUrl === "profile" ? "#F0CB52" : "#FFFFFF8F",
                     },
                     "&:hover": {
                        background: "#032629",
                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                           color: "#F0CB52",
                        },
                     },
                  }}
               >
                  <ListItemIcon
                     sx={{
                        color: "#FFFFFF8F",
                        minWidth: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                     }}
                  >
                     <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                     primary="Account Info"
                     primaryTypographyProps={{
                        sx: {
                           fontFamily: "Poppins, sans-serif",
                           fontSize: {
                              xs: "16px",
                              sm: smallHeightLaptop ? "15px" : "16px",
                           },
                           color: "#FFFFFF8F",
                           fontWeight: 400,
                        },
                     }}
                  />
               </ListItemButton>

               {/* Logout */}
               <ListItemButton
                  onClick={() => {
                     localStorage.clear();
                     dispatch(logout());
                     navigate("/");
                     dispatch(resetStep());
                     dispatch(clearAnalysisReport());
                     dispatch(clearUploadedData());
                  }}
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: "6px",
                     width: "100%",
                     borderRadius: "8px",
                     "&:hover": {
                        background: "#032629",
                        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                           color: "#F05255",
                        },
                     },
                  }}
               >
                  <ListItemIcon
                     sx={{
                        color: "#FFFFFF8F",
                        minWidth: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                     }}
                  >
                     <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                     primary="Logout"
                     primaryTypographyProps={{
                        sx: {
                           fontFamily: "Poppins, sans-serif",
                           fontSize: {
                              xs: "16px",
                              sm: smallHeightLaptop ? "15px" : "16px",
                           },
                           color: "#FFFFFF8F",
                           fontWeight: 400,
                        },
                     }}
                  />
               </ListItemButton>
            </List>
         </Box>
      </Box>
   );
};

export default Sidebar;
