import React, { useEffect, useState } from "react";
import { Button, styled, TextField, Typography } from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import Repo from "../../../Repo/Repo";
import Toast from "../../../Toast";
import { toast } from "react-toastify";

export const TextLogo = styled(Typography)({
   fontFamily: "'Space Grotesk', sans-serif",
   fontWeight: 400,
});
export const Text = styled(Typography)({
   fontFamily: "'Poppins', sans-serif",
   fontWeight: 400,
});

const SuccessCode = ({
   codeArr = [],
   inputRefs,
   handleKeyDown,
   handleChange,
   handlePaste,
   smallHeightLaptop = false,
   navigate,
   email,
}) => {
   const [resendTimer, setResendTimer] = useState(60);
   const [isResending, setIsResending] = useState(false);
   useEffect(() => {
      let timer;
      if (resendTimer > 0) {
         timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      }
      return () => clearTimeout(timer);
   }, [resendTimer]);
   const handleResendCode = async () => {
      try {
         setIsResending(true);
         await Repo.signupVerificationEmail({ email });
         setResendTimer(60); // Restart timer
         Toast.success("Verification code sent to your email.");
      } catch (err) {
         console.error("Failed to resend code:", err);
         const msg = err?.response?.data?.error || "Failed to resend code!";
         Toast.error(msg); //
      } finally {
         setIsResending(false);
      }
   };
   const handleVerification = async () => {
      try {
         const code = codeArr.join("");
         const response = await Repo.signupVerificationCode({ email, code });

         // Check if response has error
         if (response?.data?.error) {
            Toast.error("Invalid verification code!");
            return;
         }

         // Success: Navigate to success message
         navigate("/success-msg");
      } catch (error) {
         const msg = error.response?.data.error || "Invalid verification code!";
         console.log("🚀 ~ handleVerification ~ msg:", msg);

         // Show toast for invalid or failed verification
         toast.error(msg);
      }
   };
   // const handleVerification = async () => {
   //    try {
   //       const code = codeArr.join("");
   //       const response = await Repo.signupVerificationCode({ email, code });
   //       // success: proceed to next step
   //       console.log(
   //          "🚀 ~ handleVerification ~ response:",
   //          response.data.error
   //       );
   //       navigate("/success-msg");
   //    } catch (error) {
   //       const msg = error?.response?.data?.error || "Verification failed!";
   //       console.log("🚀 ~ handleVerification ~ msg:", msg);
   //       // Toast.error(msg);
   //    }
   // };
   const isCodeComplete = codeArr.every((digit) => digit !== "");
   return (
      <>
         <div className="flex items-start justify-start gap-3  flex-col w-full">
            <div className="bg-[#105055] rounded-full p-2 flex min-w-[32px]">
               <MarkEmailUnreadIcon style={{ color: "white", fontSize: 22 }} />
            </div>
            <Typography
               sx={{
                  fontSize: smallHeightLaptop ? "14px" : "16px",
                  fontWeight: 600,
                  color: "#0A3235",
               }}
               fontFamily="Poppins"
            >
               Enter code
            </Typography>
         </div>

         <Typography
            sx={{
               fontSize: smallHeightLaptop ? "14px" : "16px",
               color: "#0A3235",
               width: "100%",
            }}
            fontFamily="Poppins"
         >
            Check your email and enter the code sent to <br />
            <a
               className="text-[#1CA990] no-underline"
               style={{ fontFamily: "Poppins" }}
            >
               {/* example@email.com */}
               {email}
            </a>
         </Typography>

         <div
            className="flex justify-start gap-3 sm:gap-4 mb-4 w-full"
            onPaste={handlePaste}
         >
            {codeArr.map((digit, index) => (
               <TextField
                  key={index}
                  variant="outlined"
                  size="small"
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  inputProps={{ maxLength: 1, className: "text-center" }}
                  sx={{
                     width: { xs: 35, sm: 42 },
                     backgroundColor: "#FFFFFF",
                     borderRadius: "5px",
                     "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                           border: "none",
                        },
                        "&:hover fieldset": {
                           border: "none",
                        },
                        "&.Mui-focused fieldset": {
                           border: "none",
                        },
                     },
                     input: {
                        textAlign: "center",
                        fontSize: { xs: 22, sm: 24 },
                        padding: { xs: 0.3, sm: 0.4 },
                        color: "#292A30",
                        fontFamily: "Poppins",
                     },
                  }}
               />
            ))}
         </div>

         {/* <Typography
            sx={{
               width: "100%",
               fontSize: smallHeightLaptop ? "13px" : "14px",
               fontWeight: 500,
               color: "#0A3235",
            }}
            fontFamily="Poppins"
         >
            Resend code in 60s
         </Typography> */}
         {resendTimer > 0 ? (
            <Typography
               sx={{
                  width: "100%",
                  fontSize: smallHeightLaptop ? "13px" : "14px",
                  fontWeight: 500,
                  color: "#0A3235",
               }}
               fontFamily="Poppins"
            >
               Resend code in {resendTimer}s
            </Typography>
         ) : (
            <Button
               onClick={handleResendCode}
               disabled={isResending}
               sx={{
                  fontSize: "14px",
                  textTransform: "none",
                  fontFamily: "Poppins",
                  paddingLeft: 0,
                  color: "#1CA990",
                  backgroundColor: "transparent",
                  "&:hover": {
                     backgroundColor: "transparent",
                     textDecoration: "underline",
                  },
               }}
            >
               Resend code
            </Button>
         )}
         <Button
            variant="contained"
            fullWidth
            onClick={handleVerification}
            disabled={!isCodeComplete}
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
            Continue
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
      </>
   );
};

export default SuccessCode;
