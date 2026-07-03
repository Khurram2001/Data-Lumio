import {
   Box,
   Button,
   styled,
   TextField,
   Typography,
   IconButton,
   InputAdornment,
   useMediaQuery,
   CircularProgress,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import React, { useState } from "react";
import AuthImg from "../../../assets/authIcon.png";
import GoogleImg from "../../../assets/google-logo.png";
import { useNavigate } from "react-router-dom";
import Toast from "../../../Toast";
import Repo from "../../../Repo/Repo";
import { signInWithGoogle } from "../../../firebase/firebase";

export const TextLogo = styled(Typography)({
   fontFamily: "'Space Grotesk', sans-serif",
   fontWeight: 400,
});
export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
   fontWeight: 400,
});

const Signup = () => {
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [googleLoading, setGoogleLoading] = useState(false);
   const [error, setError] = useState("");
   const [formValues, setFormValues] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   });

   const handleTogglePassword = () => setShowPassword((prev) => !prev);
   const handleToggleConfirmPassword = () =>
      setShowConfirmPassword((prev) => !prev);
   const smallHeightLaptop = useMediaQuery(
      "(max-height:700px) and (min-width:600px)"
   );

   const textFieldStyles = {
      backgroundColor: "#E6E7E8",
      borderRadius: "8px",
      padding: smallHeightLaptop ? "0px" : "4px 0px",
      input: {
         fontFamily: "Poppins",
         color: "#292A30",
         "::placeholder": {
            color: "#292A30",
            opacity: 1,
            fontFamily: "Poppins",
            fontSize: { xs: "14px", sm: "16px" },
         },
      },
      "& .MuiOutlinedInput-root": {
         "& fieldset": {
            borderColor: "#E6E7E8",
         },
         "&:hover fieldset": {
            borderColor: "#E6E7E8",
         },
         "&.Mui-focused fieldset": {
            borderColor: "#E6E7E8",
         },
      },
   };

   const handleSubmit = async (values) => {
      const { email, password, confirmPassword } = values;

      if (!email && !password) {
         return Toast("error", "Please fill out the form");
      }
      if (!email) {
         return Toast("error", "Email is missing!");
      }
      if (!password) {
         return Toast("error", "Password is missing!");
      }
      const isMixedPassword = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
      if (!isMixedPassword.test(password)) {
         return Toast(
            "error",
            "Password must be at least 8 characters and include both letters and numbers."
         );
      }

      if (password !== confirmPassword) {
         return Toast("error", "Passwords do not match.");
      }
      if (password.length < 8) {
         return Toast("error", "Password must be at least 8 characters long.");
      }
      try {
         setLoading(true);
         setError("");
         const response = await Repo.signup({
            email,
            password,
            is_active: false,
         });
         console.log("API Response:", response);

         if (response.data.message) {
            const responseOne = await Repo.signupVerificationEmail({ email });
            console.log("responseOne", responseOne);

            if (response.data) {
               Toast(
                  "success",
                  "Verification Mail Successfully sent successful!"
               );
               navigate("/email-verification", { state: { email: email } });
            } else {
               Toast(
                  "error",
                  response.data.error || "An error occurred. Please try again."
               );
            }
         } else {
            Toast(
               "error",
               response.data.error || "An error occurred. Please try again."
            );
         }
      } catch (error) {
         Toast("error", "An error occurred. Please try again.");

         if (error.response.data.detail) {
            Toast("error", "An unexpected error occurred.");
         } else {
            Toast("error", "An unexpected error occurred.");
         }
      } finally {
         setLoading(false);
      }
   };

   const handleGoogleSignUp = async () => {
      try {
         const user = await signInWithGoogle(setGoogleLoading); // Call Google sign-in function
         console.log("USER GOOGLE", user);

         if (user) {
            console.log("Signed in with Google:", user);
            localStorage.setItem("email", user.email);

            navigate("/welcome");
            Toast("success", "Signup successful with Google!");
         }
      } catch (error) {
         // Toast("error", "Google Login failed. Please try again.");
      }
   };

   return (
      <div
         className={`py-4 px-6 sm:py-4 sm:px-40 ${
            smallHeightLaptop ? "xl:py-5" : "xl:py-9"
         } xl:px-96 flex flex-col items-center justify-center lg:items-center lg:justify-normal ${
            smallHeightLaptop ? "sm:gap-2" : "sm:gap-8"
         } h-[100vh] overflow-y-auto`}
      >
         <div
            className="max-sm:mt-[20px] max-sm:mb-[20px] flex justify-center items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
         >
            <img
               src={AuthImg}
               alt=""
               className={`w-12 ${smallHeightLaptop ? "sm:w-11" : "sm:w-14"}`}
            />
            <TextLogo
               sx={{
                  color: "#F0CB52",
                  fontWeight: 700,
                  fontSize: {
                     xs: "32px",
                     sm: smallHeightLaptop ? "34px" : "40px",
                  },
               }}
            >
               DataLumio
            </TextLogo>
         </div>
         <Box
            sx={{
               background: "#F0CB52",
               mt: smallHeightLaptop,
               borderRadius: "32px",
               // mt: "50px",
            }}
         >
            <Box
               sx={{
                  padding: {
                     xs: "20px 30px",
                     sm: "30px 55px",
                     lg: smallHeightLaptop ? "22px 65px" : "32px 70px",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: { xs: 2, sm: smallHeightLaptop ? 2 : 2.75 },
               }}
            >
               <Text
                  sx={{
                     fontWeight: 500,
                     fontSize: "18px",
                     color: "#0A3235",
                     mb: 1.5,
                     px: 3,
                     width: "100%",
                     textAlign: "center",
                  }}
               >
                  Welcome! Ready to analyze?
               </Text>
               <TextField
                  placeholder="Email"
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  fullWidth
                  value={formValues.email}
                  onChange={(e) =>
                     setFormValues({ ...formValues, email: e.target.value })
                  }
                  sx={textFieldStyles}
                  InputProps={{
                     style: {
                        fontFamily: "Poppins",
                        color: "#292A30",
                        fontSize: { xs: "14px", sm: "16px" },
                     },
                  }}
               />

               <TextField
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  fullWidth
                  value={formValues.password}
                  onChange={(e) =>
                     setFormValues({ ...formValues, password: e.target.value })
                  }
                  sx={textFieldStyles}
                  InputProps={{
                     style: {
                        fontFamily: "Poppins",
                        color: "#292A30",
                        fontSize: { xs: "14px", sm: "16px" },
                     },
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton
                              onClick={handleTogglePassword}
                              edge="end"
                           >
                              {showPassword ? (
                                 <VisibilityOutlinedIcon />
                              ) : (
                                 <VisibilityOffOutlinedIcon />
                              )}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               <TextField
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  fullWidth
                  value={formValues.confirmPassword}
                  onChange={(e) =>
                     setFormValues({
                        ...formValues,
                        confirmPassword: e.target.value,
                     })
                  }
                  sx={textFieldStyles}
                  InputProps={{
                     style: {
                        fontFamily: "Poppins",
                        color: "#292A30",
                        fontSize: { xs: "14px", sm: "16px" },
                     },
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton
                              onClick={handleToggleConfirmPassword}
                              edge="end"
                           >
                              {showConfirmPassword ? (
                                 <VisibilityOutlinedIcon />
                              ) : (
                                 <VisibilityOffOutlinedIcon />
                              )}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />

               <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSubmit(formValues)}
                  sx={{
                     py: smallHeightLaptop ? 1.1 : 1.35,
                     fontFamily: "'Poppins', sans-serif",
                     fontWeight: 500,
                     textTransform: "capitalize",
                     borderRadius: "8px",
                     backgroundColor: "#105055",
                     boxShadow: "none",
                     transition: "all 0.4s ease",
                     "&:hover": {
                        backgroundColor: "#176F76",
                        boxShadow: "none",
                     },
                  }}
               >
                  {loading && (
                     <CircularProgress
                        size={18}
                        color="inherit"
                        sx={{ mr: 1 }}
                     />
                  )}
                  Continue
               </Button>

               <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleGoogleSignUp}
                  sx={{
                     py: smallHeightLaptop ? 1 : 1.25,
                     fontFamily: "'Poppins', sans-serif",
                     fontWeight: 500,
                     textTransform: "capitalize",
                     color: "#0A3235",
                     border: "none",
                     background: "#E6E7E8",
                     borderRadius: "8px",
                     boxShadow: "none",
                     transition: "all 0.4s ease",
                     "&:hover": {
                        backgroundColor: "#105055",
                        boxShadow: "none",
                        color: "white",
                     },
                  }}
               >
                  <>
                     {googleLoading ? (
                        <>
                           <CircularProgress
                              size={18}
                              color="inherit"
                              sx={{ mr: 1 }}
                           />
                           Signing in with Google
                        </>
                     ) : (
                        <>
                           <img
                              src={GoogleImg}
                              alt="Google Logo"
                              className="w-5 mr-3.5"
                           />
                           Signing in with Google
                        </>
                     )}
                  </>
               </Button>

               <Text
                  sx={{
                     fontWeight: 500,
                     fontSize: "14px",
                     color: "#0A3235",
                     mt: 1.5,
                     px: 3,
                     width: "100%",
                     textAlign: "center",
                  }}
               >
                  Already have an account ?
               </Text>

               <Button
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  sx={{
                     fontFamily: "'Poppins', sans-serif",
                     fontWeight: 500,
                     px: 6,
                     mt: -1,
                     textTransform: "capitalize",
                     color: "#0A3235",
                     border: "1px solid #0A3235",
                     borderRadius: "8px",
                     transition: "all 0.4s ease",
                     "&:hover": {
                        border: "1px solid #0A3235",
                        background: "#0A3235",
                        color: "white",
                     },
                  }}
               >
                  Login
               </Button>
            </Box>
         </Box>
      </div>
   );
};

export default Signup;
