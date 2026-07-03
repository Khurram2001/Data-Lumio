import React from "react";
import Pricing from "../Home/Pricing";
import { canon } from "../../seo";
import { Helmet } from "react-helmet-async";

export const PricePage = () => {
   // Always force string just in case
   const url = String(canon("/subscription-plan"));

   // Debug log (check your browser console)
   console.log("canon url:", url, typeof url);

   return (
      <>
         <Helmet>
            <title>
               DataLumio Pricing – Flexible Plans for AI-Powered Research
               Analysis
            </title>

            <meta
               name="description"
               content="Turn data into deep insights with DataLumio’s AI-driven analytics: qualitative & quantitative data analysis, interactive dashboards, PDF chat, literature review, and secure, real-time reporting."
            />

            {/* Force string explicitly */}
            <link rel="canonical" href={String(url)} />
            <meta property="og:url" content={String(url)} />
         </Helmet>

         <Pricing />
      </>
   );
};

export default PricePage;