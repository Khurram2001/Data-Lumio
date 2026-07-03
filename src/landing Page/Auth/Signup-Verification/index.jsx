import { Box, styled, Typography, useMediaQuery } from "@mui/material";
import React, { useRef, useState } from "react";
import AuthImg from "../../../assets/authIcon.png";
import { useNavigate, useLocation } from "react-router-dom";
import Success from "./Success";
import SuccessCode from "./SuccessCode";
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

const EmailVerification = () => {
   const navigate = useNavigate();
   const [codeArr, setCodeArr] = useState(Array(6).fill(""));
   const [success, setSuccess] = useState(false);
   const inputRefs = useRef([]);
   const location = useLocation();
   const email = location.state?.email || "";
   const [signupVerfication, setSignupVerification] = useState(false);
   const smallHeightLaptop = useMediaQuery(
      "(max-height:700px) and (min-width:600px)"
   );

   const handleChange = (value, index) => {
      if (!/^\d*$/.test(value)) return;
      const newCode = [...codeArr];
      newCode[index] = value.slice(-1);
      setCodeArr(newCode);
      if (value && index < inputRefs.current.length - 1) {
         inputRefs.current[index + 1].focus();
      }
   };

   const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !codeArr[index] && index > 0) {
         inputRefs.current[index - 1].focus();
      }
   };

   const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
         .getData("text")
         .trim()
         .replace(/\D/g, "")
         .slice(0, 6);
      if (pastedData.length === 6) {
         setCodeArr(pastedData.split(""));
         inputRefs.current[5].focus();
      }
   };

   const handleVerification = async () => {
      if (!email) {
         Toast("error", "Email is required.");
         return;
      }

      const code = codeArr.join("");

      const response = await Repo.signupVerificationCode({ email, code });

      console.log("API Response:", response);

      if (response.status === 200) {
         Toast("success", response.data.message);
         setSignupVerification(false);
         setSuccess(true);
      } else {
         Toast(
            "error",
            response.data.error || "An error occurred. Please try again."
         );
      }
   };

   return (
      <div
         className={`py-4 px-6 sm:py-4 sm:px-40 ${
            smallHeightLaptop ? "xl:py-5" : "xl:py-9"
         } xl:px-80 flex flex-col items-center justify-center lg:items-center lg:justify-normal ${
            smallHeightLaptop ? "sm:gap-2" : "sm:gap-8"
         } h-[100vh] overflow-y-auto`}
      >
         <div
            className=" flex justify-center items-center gap-3 cursor-pointer"
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
               mt: smallHeightLaptop ? 3 : 4,
               borderRadius: "32px",
            }}
         >
            <Box
               sx={{
                  padding: {
                     xs: "20px 30px",
                     sm: "50px 75px",
                     lg: smallHeightLaptop ? "22px 55px" : "50px 80px",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: { xs: 2, sm: smallHeightLaptop ? 2 : 3.25 },
               }}
            >
               {success ? (
                  <Success
                     title="Success!"
                     message="Your account has been created"
                     onClick={() => navigate("/login")}
                     smallHeightLaptop={smallHeightLaptop}
                  />
               ) : (
                  <SuccessCode
                     codeArr={codeArr}
                     inputRefs={inputRefs}
                     handleKeyDown={handleKeyDown}
                     handleChange={handleChange}
                     handlePaste={handlePaste}
                     smallHeightLaptop={smallHeightLaptop}
                     navigate={navigate}
                     email={email}
                     handleVerification={handleVerification}
                  />
               )}
            </Box>
         </Box>
      </div>
   );
};

export default EmailVerification;
