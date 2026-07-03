import React from "react";
import {
   Stepper,
   Step,
   StepLabel,
   Typography,
   Box,
   useMediaQuery,
   StepConnector,
   styled,
} from "@mui/material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
   "& .MuiStepConnector-line": {
      height: 2,
      border: 0,
      backgroundColor: "#F0F0F0",
   },
}));

const Steps = ({ steps, activeStep, isStepActive, isStepCompleted }) => {
   const isMobile = useMediaQuery("(max-width:600px)");

   return (
      <Stepper
         alternativeLabel
         nonLinear
         activeStep={activeStep}
         connector={<ColorlibConnector />}
      >
         {steps.map((step, index) => (
            <Step key={step.label}>
               <StepLabel
                  StepIconComponent={() => (
                     <Box
                        sx={{
                           width: 30,
                           height: 30,
                           borderRadius: "50%",
                           backgroundColor: isStepCompleted(index)
                              ? "#52F064"
                              : isStepActive(index)
                              ? "#F0CB52"
                              : "#797979",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           fontSize: 12,
                           color: isStepCompleted(index)
                              ? "#FFFFFF"
                              : isStepActive(index)
                              ? "#0A3235"
                              : "#FFFFFF",
                           fontWeight: 600,
                           fontFamily: "Poppins",
                        }}
                     >
                        {index + 1}
                     </Box>
                  )}
               >
                  <Box>
                     <Typography
                        sx={{
                           fontFamily: "Poppins",
                           color: isStepCompleted(index)
                              ? "#52F064"
                              : isStepActive(index)
                              ? "#F0CB52"
                              : "#797979",
                           fontSize: { xs: "12px", sm: "16px" },
                           fontWeight: 600,
                           mt: -1,
                        }}
                     >
                        {step.label}
                     </Typography>
                     {!isMobile ? (
                        <Typography
                           sx={{
                              fontFamily: "Poppins",
                              fontSize: 12,
                              color:
                                 isStepCompleted(index) || isStepActive(index)
                                    ? "#FFFFFF"
                                    : "#797979",
                              mt: 0.15,
                           }}
                        >
                           {step.sub}
                        </Typography>
                     ) : null}
                  </Box>
               </StepLabel>
            </Step>
         ))}
      </Stepper>
   );
};

export default Steps;
