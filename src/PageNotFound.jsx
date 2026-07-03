import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
   return (
      <>
         <section className="flex justify-center  items-center bg-[#032629]  min-h-svh ">
            <div className=" flex items-center justify-center  px-5 mx-auto my-8">
               <div className="max-w-md text-center">
                  <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                     <span>Error </span>404
                  </h2>
                  <p className="my-9 text-white text-2xl font-semibold">
                     Sorry, we couldn't find this page.
                  </p>

                  <Link
                     to="/"
                     className="text-[#0A3235]  px-8 py-3 font-semibold rounded bg-[#F0CB52] hover:bg-[#07bc0c]"
                  >
                     Back to homepage
                  </Link>
               </div>
            </div>
         </section>
      </>
   );
};
