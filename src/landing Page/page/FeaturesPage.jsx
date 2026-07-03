import React from "react";
import { Helmet } from "react-helmet-async";
import { canon } from "../../seo";
import Productivity from "../Home/Productivity";
export const FeaturesPage = () => {
   const url = canon("/features");

   return (
      <>
         <Helmet>
            <title>
               DataLumio Features – Explore Powerful Tools & Capabilities
            </title>
            <meta
               name="description"
               content="Discover DataLumio’s core features: interactive dashboards, customizable reports, real-time analytics, data visualization, and seamless integrations."
            />
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} />
         </Helmet>
         <Productivity />
      </>
   );
};

export default FeaturesPage;