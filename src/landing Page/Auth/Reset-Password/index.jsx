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
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthImg from "../../../assets/authIcon.png";
import Repo from "../../../Repo/Repo";
import Toast from "../../../Toast";

export const TextLogo = styled(Typography)({
   fontFamily: "'Space Grotesk', sans-serif",
   fontWeight: 400,
});
export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
   fontWeight: 400,
});

const ResetPassword = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [formValues, setFormValues] = useState({
      password: "",
      confirmPassword: "",
   });
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const searchParams = new URLSearchParams(location.search);
   const email = searchParams.get("email");
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
         "&.Mui-disabled": {
            backgroundColor: "#E6E7E8",
            "& fieldset": {
               borderColor: "#E6E7E8", // ✅ Remove black border on disabled
            },
         },
      },
   };

   const handleTogglePassword = () => setShowPassword((prev) => !prev);
   const handleToggleConfirmPassword = () =>
      setShowConfirmPassword((prev) => !prev);

   const handleSubmit = async () => {
      const { password, confirmPassword } = formValues;

      if (password !== confirmPassword) {
         Toast("error", "Passwords do not match!");
         return;
      }

      try {
         setLoading(true);
         const response = await Repo.updateUser({ email, password });
         if (response.status === 200) {
            Toast(
               "success",
               response.data.message || "Password reset successfully"
            );
            navigate("/login");
         }
      } catch (error) {
         Toast(
            "error",
            error.response?.data?.message || "Something went wrong"
         );
      } finally {
         setLoading(false);
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
            className="flex justify-center items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
         >
            <img
               src={AuthImg}
               alt="logo"
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
               mt: smallHeightLaptop ? 3 : 4,
               borderRadius: "32px",
            }}
         >
            <Box
               sx={{
                  padding: {
                     xs: "20px 30px",
                     sm: "50px 75px",
                     lg: smallHeightLaptop ? "32px 65px" : "50px 100px",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: { xs: 2, sm: smallHeightLaptop ? 3 : 3.75 },
               }}
            >
               <div className="text-center text-[#0A3235] font-medium text-[18px] mb-2 w-full">
                  Reset Password
               </div>

               <TextField
                  value={email || "No email provided"}
                  disabled
                  fullWidth
                  variant="outlined"
                  size="small"
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
                  placeholder="New Password"
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
                  onClick={handleSubmit}
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
                  Reset Password
               </Button>
            </Box>
         </Box>
      </div>
   );
};

export default ResetPassword;
