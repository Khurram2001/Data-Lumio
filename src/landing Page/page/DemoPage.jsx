import React from "react";
import VideoSection from "../Home/VideoSection";
import { canon } from "../../seo";
import { Helmet } from "react-helmet-async";
export const DemoPage = () => {
   const url = canon("/demo");

   return (
      <>
         <Helmet>
            <title>See DataLumio in Action | Demo Video</title>
            <meta
               name="description"
               content="Watch the DataLumio demo to see how easily you can turn complex data into insightful reports. No technical skills required — get started today!"
            />
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} />
         </Helmet>
         <VideoSection />
      </>
   );
};

export default DemoPage;