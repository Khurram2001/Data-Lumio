import React, { useState } from "react";
import {
   Button,
   Dialog,
   FormControlLabel,
   Grid,
   Radio,
   RadioGroup,
   styled,
   DialogContent,
   IconButton,
   InputAdornment,
   Box,
   InputLabel,
   Stack,
   TextField,
   Typography,
   CircularProgress,
} from "@mui/material";
import GmailIcon from "../../assets/gmail.png";
import PasswordIcon from "../../assets/password.png";
import {
   CheckCircle,
   DoDisturb,
   Visibility,
   VisibilityOff,
   Delete,
} from "@mui/icons-material";
import AwardStar from "../../assets/award_star.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useDispatch, useSelector } from "react-redux";
import Repo from "../../Repo/Repo";
import Toast from "../../Toast";
import { Link, useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import moment from "moment/moment";
import { getUser, logout } from "../userSlice";
import { TextPop } from "../../landing Page/Home";
import DeleteDialog from "./DeleteDialog";
import CancelDialog from "./CancelDialog";
import {
   clearAnalysisReport,
   clearUploadedData,
   resetStep,
} from "../analysis/analysisSlice";
import { toast } from "react-toastify";

const IconBox = styled(Box)({
   background: "#35353514",
   height: "35px",
   width: "35px",
   borderRadius: "50px",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
});

function ProfileSection({ user }) {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const [openUsageDialogue, setOpenUsageDialogue] = useState(false);
   const [openFeedbackDialogue, setOpenFeedbackDialogue] = useState(false);
   const [modal, setModal] = useState(false);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const [edit, setEdit] = useState(false);
   const [validated, setValidated] = useState(false);
   const email = localStorage.getItem("email");
   const [state, setState] = useState({
      email: "",
      date: user?.created_at // or any other date field from the user
         ? moment(user.created_at).format("YYYY-MM-DD")
         : "",
      // password: "",
      // confirmPassword: "",
   });
   const [showPassword, setShowPassword] = useState(false);

   const toggle = () => setShowPassword((show) => !show);
   const toggleOpen = () => setOpen((prev) => !prev);
   const toggleCancel = () => setModal((prev) => !prev);

   const planLimits = {
      "starter-monthly": "/10",
      "starter-yearly": "/120",
      "pro-monthly": "/20",
      "pro-yearly": "/240",
   };

   const handleInput = (e) => {
      const { name, value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
   };

   // const handleConfirmInput = (e) => {
   //    const { name, value } = e.target;
   //    setState((prev) => ({ ...prev, [name]: value }));

   //    if (value === state.password) {
   //       setValidated(!validated);
   //    } else setValidated(false);
   // };
   // const handleUsage = () => {
   //    setOpenUsageDialogue(true);
   // };

   const handleCancelSubscription = async () => {
      setLoading(true);
      try {
         const email = localStorage.getItem("email"); // Get email from localStorage
         const response = await Repo.CancelSubscription({ email });
         console.log("Cancel response", response);
         if (response.status === 200) {
            Toast("success", "Subscription canceled successfully.");
            toggleCancel();
            dispatch(getUser());
         } else {
            Toast(
               "error",
               response?.message || "Failed to cancel subscription."
            );
         }
      } catch (error) {
         const errorMessage = error || "Invalid credentials. Try again.";
         console.log("Login errorr:", errorMessage);
         Toast("error", errorMessage?.message);
      } finally {
         setLoading(false); // Stop loading in both success and error cases
      }
   };

   const handleDelete = async () => {
      try {
         setLoading(true);
         const response = await Repo.deleteAccount({
            email: localStorage.getItem("email"),
         });

         // Check response status, not inside data object
         if (response.status === 200) {
            toast.dismiss(); // Dismiss any old toasts
            toast.clearWaitingQueue(); // Clear any queued toasts
            Toast("success", "Your account has been successfully deleted.");

            // Auto logout and cleanup
            setTimeout(() => {
               localStorage.clear();
               dispatch(logout());
               dispatch(resetStep());
               dispatch(clearAnalysisReport());
               dispatch(clearUploadedData());
               navigate("/"); // Redirect to landing/login page
            }, 600); // Give toast time to show
            setLoading(false);
            toggleOpen(); // Close dialog
         } else {
            toast.dismiss();
            toast.clearWaitingQueue();
            Toast("error", "Error deleting account.");
            setLoading(false);
            toggleOpen();
         }
      } catch (err) {
         console.log("err:", err);
         toast.dismiss();
         toast.clearWaitingQueue();
         Toast("error", "Error deleting account.");
         setLoading(false);
         toggleOpen();
      }
   };

   const handleSendFeedback = () => {
      setOpenFeedbackDialogue(true);
   };

   const isPro = user?.plan && user.plan.toLowerCase().includes("pro");
   const showStarter = !isPro && user?.credits > 0;
   const normalizedPlan = isPro ? "pro" : showStarter ? "starter" : null;

   return (
      <Box
         sx={{
            margin: "0 auto",
            px: 3,
            mt: 5,
         }}
      >
         <Stack
            spacing={{ xs: 1.6, sm: 5, md: 4 }}
            px={{ xs: 0, sm: 3, md: 0 }}
         >
            <Grid
               container
               spacing={2}
               mt={2}
               sx={{ width: "100%", flexWrap: "wrap" }}
            >
               <Grid
                  item
                  md={6}
                  sx={{ width: { xs: "100%", sm: "auto" }, flexGrow: 1 }}
               >
                  <Stack
                     spacing={1}
                     sx={{
                        display: { xs: "flex", sm: "unset" },
                        alignItems: { xs: "center", sm: "unset" },
                     }}
                  >
                     <InputLabel
                        sx={{
                           fontWeight: 600,
                           fontSize: "16px",
                           color: "#FFFFFF",
                           width: { xs: "100%", sm: "auto" },
                           fontFamily: "Poppins",
                        }}
                     >
                        Email
                     </InputLabel>

                     <Box
                        sx={{
                           display: "flex",
                           background: "#0A3235",
                           borderRadius: "4px",
                           height: "40px",
                           width: { xs: "100%", sm: "auto" },
                        }}
                     >
                        <Box
                           sx={{
                              borderRadius: "4px",
                              width: "60px",
                              background: "#35353514",
                           }}
                        >
                           <Stack
                              alignItems="center"
                              justifyContent="center"
                              sx={{ background: "#125459" }}
                              borderRadius={"4px"}
                           >
                              <img
                                 src={GmailIcon}
                                 alt=""
                                 style={{ width: "40px" }}
                              />
                           </Stack>
                        </Box>
                        <Box
                           sx={{
                              px: 1,
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "Poppins",
                           }}
                        >
                           {email || "example@example.com"}
                        </Box>
                     </Box>
                  </Stack>
               </Grid>
               <Grid
                  item
                  md={6}
                  sx={{ width: { xs: "100%", sm: "auto" }, flexGrow: 1 }}
               >
                  <Stack
                     spacing={0.5}
                     sx={{
                        display: { xs: "flex", sm: "unset" },
                        alignItems: { xs: "center", sm: "unset" },
                     }}
                  >
                     <Stack
                        direction="row"
                        spacing={1}
                        width={{ xs: "100%", sm: "auto" }}
                     >
                        <InputLabel
                           sx={{
                              fontWeight: 600,
                              fontSize: "16px",
                              color: "#FFFFFF",
                              fontFamily: "Poppins",
                           }}
                        >
                           Joining on
                        </InputLabel>
                        {/* <InputLabel
                           sx={{
                              fontWeight: 400,
                              fontSize: "14px",
                              color: "#FFFFFF",
                              fontFamily: "Poppins",
                           }}
                        >
                           (can be updated)
                        </InputLabel> */}
                     </Stack>
                     <TextField
                        variant="outlined"
                        size="small"
                        type="date"
                        // type={showPassword ? "text" : "password"}
                        // placeholder="*********"
                        name="date"
                        disabled={!edit}
                        sx={{
                           marginTop: "8px !important",
                           borderRadius: "4px",
                           background: "#0A3235",
                           border: "none",
                           "& fieldset": { padding: "0px", border: "none" },
                           width: { xs: "100%", sm: "100%" },
                           "& input::placeholder": {
                              color: "#FFFFFF",
                              opacity: 1, // To ensure full opacity even when disabled
                           },
                           "& input": {
                              color: "#FFFFFF",
                           },
                           "& input:disabled": {
                              color: "#FFFFFF", // Also make typed text white when disabled (if any)
                              WebkitTextFillColor: "#FFFFFF", // For some browsers like Chrome
                           },
                        }}
                        autoComplete="off"
                        InputProps={{
                           style: { padding: "0" },
                           startAdornment: (
                              <InputAdornment position="start">
                                 <Box
                                    sx={{
                                       borderRadius: "4px",
                                       width: "60px",
                                       background: "#125459",
                                    }}
                                 >
                                    <Stack
                                       alignItems="center"
                                       justifyContent="center"
                                    >
                                       <img
                                          src={PasswordIcon}
                                          alt=""
                                          style={{ width: "40px" }}
                                       />
                                    </Stack>
                                 </Box>
                              </InputAdornment>
                           ),
                           endAdornment: (
                              <InputAdornment sx={{ mr: 2 }} position="end">
                                 {/* <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggle}
                                    edge="end"
                                 >
                                    {showPassword ? (
                                       <VisibilityOff
                                          sx={{ color: "#FFFFFF" }}
                                       />
                                    ) : (
                                       <Visibility sx={{ color: "#FFFFFF" }} />
                                    )}
                                 </IconButton> */}
                              </InputAdornment>
                           ),
                        }}
                        value={state.date}
                        onChange={handleInput}
                     />
                     {/* {edit && (
                        <>
                           <Stack
                              direction="row"
                              spacing={1}
                              width={{ xs: "100%", sm: "auto" }}
                           >
                              <InputLabel
                                 sx={{
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    color: "#FFFFFF",
                                 }}
                              >
                                 Confirm Password
                              </InputLabel>
                           </Stack>
                           <TextField
                              variant="outlined"
                              size="small"
                              placeholder="*********"
                              name="confirmPassword"
                              disabled={!edit}
                              type={showPassword ? "text" : "password"}
                              sx={{
                                 marginTop: "4px !important",
                                 borderRadius: "4px",
                                 background: "#0A3235",
                                 border: "none",
                                 "& fieldset": {
                                    padding: "0px",
                                    border: "none",
                                 },
                                 width: { xs: "100%", sm: "100%" },
                                 "& input::placeholder": {
                                    color: "#FFFFFF",
                                    opacity: 1,
                                 },
                                 "& input": {
                                    color: "#FFFFFF",
                                 },
                                 "& input:disabled": {
                                    color: "#FFFFFF", // Also make typed text white when disabled (if any)
                                    WebkitTextFillColor: "#FFFFFF", // For some browsers like Chrome
                                 },
                              }}
                              autoComplete="off"
                              InputProps={{
                                 style: { padding: "0" },
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <Box
                                          sx={{
                                             borderRadius: "4px",
                                             width: "60px",
                                             background: "#125459",
                                          }}
                                       >
                                          <Stack
                                             alignItems="center"
                                             justifyContent="center"
                                          >
                                             <img
                                                src={PasswordIcon}
                                                alt=""
                                                style={{ width: "40px" }}
                                             />
                                          </Stack>
                                       </Box>
                                    </InputAdornment>
                                 ),
                                 endAdornment: (
                                    <InputAdornment
                                       sx={{ mr: 2 }}
                                       position="end"
                                    >
                                       <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={toggle}
                                          edge="end"
                                       >
                                          {showPassword ? (
                                             <VisibilityOff
                                                sx={{ color: "#FFFFFF" }}
                                             />
                                          ) : (
                                             <Visibility
                                                sx={{ color: "#FFFFFF" }}
                                             />
                                          )}
                                       </IconButton>
                                    </InputAdornment>
                                 ),
                              }}
                              value={state.confirmPassword}
                              onChange={handleConfirmInput}
                           />
                        </>
                     )} */}
                     {/* <Box
                        sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           alignItems: "center",
                        }}
                     >
                        {edit && validated && (
                           <Box
                              sx={{
                                 flex: 1,
                                 justifyContent: "flex-start",
                                 display: "flex",
                                 alignItems: "center",
                              }}
                           >
                              <Stack
                                 direction="row"
                                 alignItems="center"
                                 gap="3px"
                                 marginTop="12px"
                              >
                                 <InputLabel
                                    sx={{
                                       fontWeight: 400,
                                       fontSize: "10px",
                                       color: "#353535",
                                    }}
                                 >
                                    <CheckCircle
                                       sx={{
                                          color: "#62B14E",
                                          fontSize: "12px",
                                       }}
                                    />
                                 </InputLabel>
                                 <InputLabel
                                    sx={{
                                       fontWeight: 600,
                                       fontSize: "12px",
                                       color: "green",
                                    }}
                                 >
                                    Password Confirmed
                                 </InputLabel>
                              </Stack>
                           </Box>
                        )}

                        {!edit && (
                           <Button
                              variant="contained"
                              size="small"
                              sx={{
                                 color: "#FFFFFF",
                                 textTransform: "none",
                                 background: "#125459",
                                 marginTop: "12px",
                                 px: 2,
                                 fontFamily: "Poppins",
                              }}
                              onClick={() => setEdit(!edit)}
                           >
                              Edit
                           </Button>
                        )}
                        {edit && (
                           <Button
                              variant="contained"
                              size="small"
                              sx={{
                                 color: "#FFFFFF",
                                 textTransform: "none",
                                 background: "#125459",
                                 marginRight: "12px",
                                 marginTop: "12px",
                              }}
                              onClick={() => setEdit(!edit)}
                           >
                              Cancel
                           </Button>
                        )}
                        {edit && (
                           <Button
                              variant="contained"
                              size="small"
                              sx={{
                                 color: "#FFFFFF",
                                 textTransform: "none",
                                 background: "#125459",
                                 marginTop: "12px",
                              }}
                              onClick={() => UpdatePassword(state)}
                           >
                              Save
                           </Button>
                        )}
                     </Box> */}
                  </Stack>
               </Grid>
            </Grid>

            <Box
               sx={{
                  borderRadius: "8px",
                  background: "#0A3235",
                  minHeight: "136px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: user?.cancel_subscription ? "8px" : "16px",
                  flexWrap: "wrap",
                  gap: 2,
               }}
            >
               <Stack
                  direction="row"
                  justifyContent={{ xs: "center", sm: "space-evenly" }}
                  alignItems="center"
                  spacing={2}
                  width={{ xs: "100%", sm: "auto" }}
               >
                  <IconBox
                     sx={{
                        width: "53px",
                        height: "53px",
                        background: "#125459",
                     }}
                  >
                     <img width="32px" height="36px" src={AwardStar} alt="" />
                  </IconBox>
                  <Stack sx={{ py: { xs: 2, sm: 0 } }}>
                     {["starter", "pro"].includes(normalizedPlan) && (
                        <TextPop
                           sx={{
                              fontWeight: 500,
                              fontSize: "14px",
                              color: "#FFFFFF",
                              textAlign: "center",
                           }}
                        >
                           Plan Type
                        </TextPop>
                     )}

                     <TextPop
                        sx={{
                           fontWeight: 400,
                           fontSize: { xs: "14px", md: "16px" },
                           color: "#FFFFFF",
                           textAlign: "left",
                           textTransform: "none",
                           lineHeight: 1.6,
                           maxWidth: "700px",
                           hyphens: "auto",
                           wordBreak: "break-word",
                        }}
                     >
                        {normalizedPlan === "pro"
                           ? "Pro"
                           : normalizedPlan === "starter"
                           ? "Starter"
                           : "To start analyzing your files, please subscribe to a plan or make a one-time purchase to add usage credits. Your current tier usage will be displayed here after activation."}
                     </TextPop>
                  </Stack>
               </Stack>
               {user?.plan &&
                  user?.cancel_subscription &&
                  moment.unix(user?.cancellation_date).isValid() && (
                     <TextPop
                        sx={{
                           fontWeight: 400,
                           fontSize: "12px",
                           width: { xs: "100%", md: "30%" },
                           color: "#fff",
                           textAlign: "center",
                           // py: { xs: 3, sm: 0 },
                           my: { md: 4, lg: 2 },
                        }}
                     >
                        Your subscription is scheduled for cancellation on{" "}
                        <TextPop
                           variant="span"
                           sx={{ fontWeight: 600, color: "#E35050" }}
                        >
                           {moment
                              .unix(user?.cancellation_date)
                              .format("DD-MM-YYYY")}
                        </TextPop>
                        . After this date, your remaining usage capacity will
                        end. To continue using our services, please resubscribe.
                     </TextPop>
                  )}

               {/* Only show usage/analysis info if on Pro or Starter */}
               {(normalizedPlan === "pro" || normalizedPlan === "starter") && (
                  <Stack
                     direction={"column"}
                     justifyContent={"center"}
                     alignItems={"center"}
                     sx={{ background: "#1C4A4D" }}
                     marginLeft={"auto"}
                     mr={{ xs: "auto", sm: "unset" }}
                     p={1}
                     borderRadius={"8px"}
                  >
                     <TextPop sx={{ fontSize: "14px" }}>
                        <TextPop variant="span" sx={{ color: "#F0CB52" }}>
                           Credit:{" "}
                        </TextPop>
                        <TextPop variant="span" sx={{ color: "#52F064" }}>
                           {user?.credits}
                        </TextPop>
                     </TextPop>
                     <TextPop sx={{ fontSize: "14px" }}>
                        1 analysis / credit
                     </TextPop>
                  </Stack>
               )}

               <Stack
                  alignItems={{ xs: "center", sm: "flex-end" }}
                  justifyContent={{ xs: "center", sm: "flex-end" }}
                  spacing={2}
                  width={{ xs: "100%", sm: "auto" }}
                  // marginLeft={{ lg: "auto" }}
                  sx={{ pb: { xs: 2, sm: 0 } }}
               >
                  <Stack
                     direction="row"
                     alignItems="flex-end"
                     justifyContent={{ xs: "center", sm: "flex-end" }}
                     spacing={3}
                  >
                     {/* <Button
                variant="contained"
                size="small"
                sx={{
                  color: "#FFFFFF",
                  background: "#125459",
                  textTransform: "none",
                  borderRadius: "4px",
                  fontFamily: "Poppins",
                  px: 2,
                }}
                onClick={handleUsage}
              >
                Check Usage
              </Button> */}
                     <Link to="/subscription">
                        <Button
                           variant="contained"
                           size="small"
                           sx={{
                              color: "#FFFFFF",
                              background: "#125459",
                              textTransform: "none",
                              borderRadius: "4px",
                              fontFamily: "Poppins",
                              px: 2,
                           }}
                        >
                           Change Plan
                        </Button>
                     </Link>
                  </Stack>
                  {user?.plan && (
                     <Stack direction="row" spacing={1}>
                        <VerifiedIcon sx={{ color: "#52F064" }} />
                        <TextPop
                           sx={{
                              fontWeight: 700,
                              color: "#52F064",
                              fontSize: "18px",
                           }}
                        >
                           {"Subscription Active"}
                        </TextPop>
                     </Stack>
                  )}
               </Stack>
            </Box>
            <Stack
               direction="row"
               alignItems="center"
               justifyContent="space-between"
               spacing={{ sm: 2 }}
               flexWrap={"wrap"}
            >
               {user?.plan && !user?.cancel_subscription && (
                  <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                     <Button
                        variant="contained"
                        size="small"
                        sx={{
                           color: "#032629",
                           textTransform: "none",
                           background: "#B9C2C3",
                           py: 0.75,
                           width: { xs: "100%", sm: "auto" },
                           px: 2,
                           my: "12px",
                           fontWeight: 600,
                        }}
                        onClick={toggleCancel}
                     >
                        <DoDisturb sx={{ color: "#032629", mr: 1 }} /> Cancel
                        Subscription
                     </Button>
                  </Box>
               )}
               <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                  <Button
                     variant="contained"
                     size="small"
                     sx={{
                        color: "#FFFFFF",
                        textTransform: "none",
                        background: "#E25050",
                        width: { xs: "100%", sm: "auto" },
                        my: "12px",
                        fontFamily: "Poppins",
                        py: 0.75,
                        fontWeight: 600,
                        px: 2,
                     }}
                     onClick={toggleOpen}
                  >
                     <Delete sx={{ color: "#FFFFFF", mr: 1 }} /> Delete Account
                  </Button>
               </Box>
            </Stack>
         </Stack>

         <DeleteDialog
            open={open}
            onClose={toggleOpen}
            onDelete={handleDelete}
            loading={loading}
         />

         <CancelDialog
            open={modal}
            onClose={toggleCancel}
            onProceed={handleCancelSubscription}
            loading={loading}
         />
      </Box>
   );
}

export default ProfileSection;
