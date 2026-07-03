import React from "react";
import QualitativeImg from "../../assets/qualitativeTypeCard.svg";
import QuantitativeImg from "../../assets/quantitativeTypeCard.svg";
import { useNavigate } from "react-router-dom";
const StepAnalysis = () => {
   return (
      <div>
         <h1 className="font-[700] text-[24px] sm:text-[32px] text-[#F0CB52] mt-5 text-center">
            Choose Analysis Type
         </h1>
         <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
            <AnalysisCard
               image={QualitativeImg}
               title="Qualitative Analysis"
               description="Explore and analyze non-numerical data such as text data, interviews, and observations"
               buttonText="Select"
               buttonLink="/analysis"
            />
            <AnalysisCard
               image={QuantitativeImg}
               title="Quantitative Analysis"
               description="Explores and analyze numerical data such as weather data and sale's numbers."
               buttonText="Select"
               buttonLink="/quantittive-upload-file"
            />
         </div>
      </div>
   );
};

export default StepAnalysis;
const AnalysisCard = ({
   image,
   title,
   description,
   buttonText = "Select",
   buttonLink = "/",
}) => {
   const navigate = useNavigate();

   return (
      <div className="mt-9">
         {/* Main Card */}
         <div className="bg-[#0A3235] w-full max-w-[400px] rounded-[32px]">
            <img src={image} alt={title} />

            <h2 className="text-[#52F064] font-[700] text-[28px] text-center my-6">
               {title}
            </h2>

            <div className="flex justify-center pb-10">
               <button
                  className="font-[500] text-center font-poppins text-[16px] leading-6 
              px-[70px] py-4 
              bg-[#E5E5E5] text-[#0A3235] 
              rounded-[8px] cursor-pointer
              transition-all duration-300 ease-in-out
              hover:bg-gradient-to-r hover:from-[#22C5A8] hover:to-[#52F064]
               hover:shadow-lg hover:scale-105 active:scale-95"
                  onClick={() => navigate(buttonLink)}
               >
                  {buttonText}
               </button>
            </div>
         </div>

         {/* Description Card */}
         <div className="w-full max-w-[400px] bg-[#021C1F] p-[22px] rounded-[32px] text-center mt-5">
            <p className="font-[400] text-[18px] font-poppins text-[#FFFFFF]">
               {description}
            </p>
         </div>
      </div>
   );
};
