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
import Repo from "../../../Repo/Repo";
import Toast from "../../../Toast";
import { signInWithGoogle } from "../../../firebase/firebase";
import { useDispatch } from "react-redux";
import { getUser } from "../../../dashboard/userSlice";

export const TextLogo = styled(Typography)({
   fontFamily: "'Space Grotesk', sans-serif",
   fontWeight: 400,
});
export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
   fontWeight: 400,
});

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [googleLoading, setGoogleLoading] = useState(false);
   const [error, setError] = useState("");
   const dispatch = useDispatch();
   const [forgotPassword, setForgotPassword] = useState(false);
   console.log("Forgot Password", forgotPassword);
   const [formValues, setFormValues] = useState({
      email: "",
      password: "",
   });

   const navigate = useNavigate();
   const handleTogglePassword = () => setShowPassword((prev) => !prev);
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
      const { email, password } = values;

      if (!email && !password) {
         return Toast("error", "Please fill out the form");
      }
      if (!email) {
         return Toast("error", "Email is missing!");
      }
      if (!password) {
         return Toast("error", "Password is missing!");
      }

      try {
         setLoading(true);
         setError("");
         const response = await Repo.login({ email, password });

         // const response = await axios.post("/api/auth/login", { email, password });
         console.log("response", response);

         if (response.data.error) {
            Toast("error", response.data.error); // Display the exact error message from backend
            setError(response.data.error);
            return; // Stop execution if there's an error
         }

         if (response.status === 200) {
            localStorage.setItem("email", email);
            await dispatch(getUser()).unwrap();
            Toast("success", "Login successful!");
            navigate("/welcome");
            // dispatch(getUser());
            // await dispatch(getUser()).unwrap(); // wait for user data fully fetched
            // navigate("/welcome");
         } else {
            Toast("error", response || "Invalid credentials. Try again.");
         }
      } catch (error) {
         const errorMessage = error || "Invalid credentials. Try again.";
         console.log("Login errorr:", errorMessage);

         setError(errorMessage.message);
         Toast("error", errorMessage.message);
      } finally {
         setLoading(false);
      }
   };

   const handleGoogleLogin = async () => {
      try {
         const user = await signInWithGoogle(setGoogleLoading);
         console.log("USER GOOGLE", user);

         if (user) {
            console.log("Signed in with Google:", user);
            localStorage.setItem("email", user.email);

            await dispatch(getUser()).unwrap();
            Toast("success", "Login successful!");
            navigate("/welcome");
            // dispatch(getUser());
         }
      } catch (error) {
         console.error("Google Login Error:", error.message);
         // Toast("error", "Google Login failed. Please try again.");
      }
   };

   const handleForgotPassword = async () => {
      if (!formValues.email) {
         Toast("error", "Please write your email");
         return;
      }
      setLoading(true);
      try {
         // const response = await axios.post("/api/auth/forgotpassword", values);
         const response = await Repo.forgotPasswordUser({
            email: formValues.email,
         });

         Toast("success", "Reset link sent to your email");
      } catch (error) {
         console.error("Error:", error);
         Toast(
            "error",
            error.response?.data?.message || "Something went wrong"
         );
      }
      setLoading(false);
   };

   return (
      <div
         className={`py-4 px-6 sm:py-4 sm:px-40 ${
            forgotPassword
               ? "xl:py-8"
               : smallHeightLaptop
               ? "xl:py-5"
               : "xl:py-4"
         } xl:px-96 flex flex-col items-center justify-center lg:items-center lg:justify-normal ${
            forgotPassword
               ? "sm:gap-5"
               : smallHeightLaptop
               ? "sm:gap-2"
               : "sm:gap-5"
         } h-[100vh] overflow-y-auto`}
      >
         <div
            className="max-sm:mb-[17px] mt-[19px] flex justify-center items-center gap-3 cursor-pointer "
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
               mt: smallHeightLaptop ? 4 : 3,
               borderRadius: "32px",
               width: {
                  xs: forgotPassword ? "100%" : "auto",
                  md: forgotPassword ? "80%" : "auto",
               },
               mt: "12px",
            }}
         >
            <Box
               // className="w-[425px] my-auto"
               sx={{
                  width: {
                     // xs: "430px",
                     xs: "315px", // Full width for small devices
                     sm: "430px", // Slightly smaller on small devices
                     md: "430px", // Medium devices
                     lg: forgotPassword ? "500px" : "455px", // large screens
                  },
                  padding: {
                     xs: "20px 30px",
                     sm: "30px 55px",
                     lg: forgotPassword
                        ? "22px 55px"
                        : smallHeightLaptop
                        ? "22px 65px"
                        : "32px 75px",
                  },

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: {
                     xs: 2,
                     sm: smallHeightLaptop ? (forgotPassword ? 3 : 2.5) : 3.5,
                  },
               }}
            >
               <Text
                  sx={{
                     fontWeight: 500,
                     fontSize: "18px",
                     color: "#0A3235",
                     mb: 1.5,
                     // px: 3,
                     width: "100%",
                     textAlign: "center",
                  }}
               >
                  {forgotPassword
                     ? "Forgot Password?"
                     : " Welcome! Ready to analyze?"}
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
                        borderRadius: "",
                        fontSize: { xs: "14px", sm: "16px" },
                     },
                  }}
               />

               {!forgotPassword ? (
                  <>
                     <TextField
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        size="small"
                        autoComplete="off"
                        fullWidth
                        value={formValues.password}
                        onChange={(e) =>
                           setFormValues({
                              ...formValues,
                              password: e.target.value,
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

                     <Button
                        variant="contained"
                        fullWidth
                        // onClick={() => navigate("/welcome")}
                        onClick={() => handleSubmit(formValues)}
                        sx={{
                           py: smallHeightLaptop ? 1.1 : 1.35,
                           fontFamily: "'Poppins', sans-serif",
                           fontWeight: 500,
                           textTransform: "capitalize",
                           backgroundColor: "#105055",
                           borderRadius: "8px",
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
                        onClick={handleGoogleLogin}
                        sx={{
                           py: smallHeightLaptop ? 1 : 1.25,
                           fontFamily: "'Poppins', sans-serif",
                           fontWeight: 500,
                           textTransform: "capitalize",
                           color: "#0A3235",
                           borderRadius: "8px",
                           border: "none",
                           background: "#E6E7E8",
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
                                 Logging in with Google
                              </>
                           ) : (
                              <>
                                 <img
                                    src={GoogleImg}
                                    alt="Google Logo"
                                    className="w-5 mr-3.5"
                                 />
                                 Continue with Google
                              </>
                           )}
                        </>
                     </Button>

                     <Text
                        sx={{
                           fontWeight: 500,
                           fontSize: "14px",
                           color: "#0A3235",
                           mt: 1,
                           px: 3,
                           width: "100%",
                           textAlign: "center",
                        }}
                     >
                        Don’t have an account ?
                     </Text>

                     <Button
                        variant="outlined"
                        onClick={() => navigate("/signup")}
                        sx={{
                           fontFamily: "'Poppins', sans-serif",
                           fontWeight: 500,
                           px: 5,
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
                        Sign Up
                     </Button>
                     <Text
                        onClick={() => setForgotPassword(true)}
                        sx={{
                           fontWeight: 500,
                           fontSize: "14px",
                           color: "#0A3235",
                           mt: -1,
                           px: 3,
                           width: "100%",
                           textAlign: "center",
                           cursor: "pointer",
                           "&:hover": { color: "#062022" },
                        }}
                     >
                        Forgot Password
                     </Text>
                  </>
               ) : (
                  <>
                     <Button
                        variant="contained"
                        fullWidth
                        onClick={handleForgotPassword}
                        sx={{
                           py: smallHeightLaptop ? 1.1 : 1.35,
                           fontFamily: "'Poppins', sans-serif",
                           fontWeight: 500,
                           textTransform: "capitalize",
                           backgroundColor: "#105055",
                           borderRadius: "8px",
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
                        Get Code
                     </Button>
                     <Box
                        sx={{
                           width: "100%",
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                        }}
                     >
                        <Button
                           onClick={() => setForgotPassword(false)}
                           variant="outlined"
                           // fullWidth
                           sx={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 500,
                              px: 2,
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
                           Back to Login
                        </Button>
                     </Box>
                  </>
               )}
            </Box>
         </Box>
      </div>
   );
};

export default Login;
