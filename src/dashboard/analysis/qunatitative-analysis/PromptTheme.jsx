import React, { useState } from "react";

const PromptTheme = ({ onNext, onPrevious }) => {
   const [value, setValue] = useState("");
   const [error, setError] = useState(false);

   const handleChange = (e) => {
      const text = e.target.value;

      if (text.length <= 255) {
         setValue(text);
         setError(false);
      } else {
         setError(true);
         setValue(text.slice(0, 255)); // Prevent more than 255 chars
      }
   };

   const charCount = value.length;

   return (
      <>
         {/* Info box */}
         <div className="bg-[#3F5A5C] px-4 py-8 rounded-[16px] w-full max-w-[980px]">
            <p className="font-[400] text-[16px] text-[#FFFFFF] text-start">
               To ensure best results please ask only one question per analysis.
               DataLumio can only process one question. Asking multiple
               questions will affect the quality of the output. If you do not
               wish to enter a research question, please leave the text box
               below empty.
            </p>
         </div>

         {/* Textarea */}
         <div className="w-full max-w-[980px] mx-auto mt-5">
            <textarea
               value={value}
               onChange={handleChange}
               rows={3}
               className={`font-[400] font-sans text-[16px] w-full max-w-[980px] rounded-[8px] p-4 outline-none resize-none bg-[#E6E7E8] text-[#292A30] ${
                  charCount >= 255
                     ? "border border-red-500"
                     : "border border-transparent"
               }`}
               placeholder="Type your question here (optional)"
            />

            {/* Counter + Error message */}
            <div className="flex justify-between mt-2">
               <p
                  className={`text-[13px] ${
                     charCount >= 255 ? "text-red-500" : "text-gray-600"
                  }`}
               >
                  {charCount} / 255 characters
               </p>
               {error && (
                  <p className="text-[13px] text-red-500">
                     Character limit reached! You cannot type more than 255
                     characters.
                  </p>
               )}
            </div>
         </div>

         {/* Navigation Buttons */}
         <div className="flex justify-center gap-9 w-full max-w-[980px] mt-6">
            {/* Previous Button */}
            <button
               onClick={onPrevious}
               className="bg-[#D5D5D5] cursor-pointer hover:bg-[#F5F5F5] text-[#0A3235] font-medium px-9 py-2 rounded-[8px] transition-all"
            >
               Previous
            </button>

            {/* Next Step Button */}
            <button
               onClick={() => onNext(value)}
               disabled={error}
               className={`${
                  error
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-[#F0CB52] hover:bg-[#84F052] cursor-pointer"
               } text-[#0A3235] font-semibold px-9 py-2 rounded-[8px] transition-all`}
            >
               Next Step
            </button>
         </div>
      </>
   );
};

export default PromptTheme;
