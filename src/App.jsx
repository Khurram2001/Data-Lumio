import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import { useDispatch } from "react-redux";
import { getUser } from "./dashboard/userSlice";
import { RedirectIfLoggedIn, RequireAuth } from "./RouteGuards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PageNotFound } from "./PageNotFound";
import Success from "./landing Page/Auth/Signup-Verification/Success";
import LandingLayout from "./layouts/LandingLayout";

// Lazy-loaded Landing Pages
const LandingPage = lazy(() => import("./landing Page/Home/index"));
const FeaturesPage = lazy(() => import("./landing Page/page/FeaturesPage"));
const PricePage = lazy(() => import("./landing Page/page/PricePage"));
const DemoPage = lazy(() => import("./landing Page/page/DemoPage"));
const Login = lazy(() => import("./landing Page/Auth/Login"));
const Signup = lazy(() => import("./landing Page/Auth/Signup"));
const EmailVerification = lazy(() =>
   import("./landing Page/Auth/Signup-Verification")
);
const ResetPassword = lazy(() => import("./landing Page/Auth/Reset-Password"));
const DataSecurity = lazy(() => import("./landing Page/data-security/index"));
const LandingContact = lazy(() => import("./landing Page/Contact/index"));

// Dashboard Pages
const DashboardContact = lazy(() => import("./Components/ContactUs"));
const Welcome = lazy(() => import("./dashboard/welcome"));
const StepAnalysis = lazy(() => import("./dashboard/welcome/StepAnalysis"));
const QuantittiveFileUpload = lazy(() =>
   import("./dashboard/analysis/qunatitative-analysis/QuantittiveFileUpload")
);
const Layout = lazy(() => import("./dashboard/Layout"));
const Analysis = lazy(() => import("./dashboard/analysis"));
const Subscription = lazy(() => import("./dashboard/subscription"));
const BasicTabs = lazy(() => import("./dashboard/account-info"));

function App() {
   const dispatch = useDispatch();
   const location = useLocation();

   const isLandingPage = [
      "/",
      "/login",
      "/signup",
      "/email-verification",
      "/reset-password",
      "/data-security",
      "/contact-us",
   ].includes(location.pathname);

   useEffect(() => {
      const email = localStorage.getItem("email");
      if (email) {
         dispatch(getUser());
      }
   }, [dispatch]);

   useEffect(() => {
      if (typeof window.gtag === "function") {
         window.gtag("config", "G-M91X02768N", {
            page_path: location.pathname + location.search,
         });
      }
   }, [location]);

   return (
      <>
         <ScrollToTop />
         {isLandingPage && <ScrollToTopButton />}

         <Suspense
            fallback={
               <div style={{ textAlign: "center", marginTop: "50px" }}>
                  Loading...
               </div>
            }
         >
            <Routes>
               {/* Landing Routes */}
               <Route
                  path="/"
                  element={
                     <RedirectIfLoggedIn>
                        <LandingPage />
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="features"
                  element={
                     <RedirectIfLoggedIn>
                        <LandingLayout>
                           <FeaturesPage />
                        </LandingLayout>
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="subscription-plan"
                  element={
                     <RedirectIfLoggedIn>
                        <LandingLayout>
                           <PricePage />
                        </LandingLayout>
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="demo"
                  element={
                     <RedirectIfLoggedIn>
                        <LandingLayout>
                           <DemoPage />
                        </LandingLayout>
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="/login"
                  element={
                     <RedirectIfLoggedIn>
                        <Login />
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="/signup"
                  element={
                     <RedirectIfLoggedIn>
                        <Signup />
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="/email-verification"
                  element={
                     <RedirectIfLoggedIn>
                        <EmailVerification />
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="/reset-password"
                  element={
                     <RedirectIfLoggedIn>
                        <ResetPassword />
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="/data-security"
                  element={
                     <RedirectIfLoggedIn>
                        <DataSecurity />
                     </RedirectIfLoggedIn>
                  }
               />
               <Route
                  path="/contact-us"
                  element={
                     <RedirectIfLoggedIn>
                        <LandingContact />
                     </RedirectIfLoggedIn>
                  }
               />

               {/* Dashboard Routes */}
               <Route
                  path="/welcome"
                  element={
                     <RequireAuth>
                        <Layout children={<Welcome />} />
                     </RequireAuth>
                  }
               />
               <Route
                  path="/step-analysis"
                  element={
                     <RequireAuth>
                        <Layout children={<StepAnalysis />} />
                     </RequireAuth>
                  }
               />
               <Route
                  path="/quantittive-upload-file"
                  element={
                     <RequireAuth>
                        <Layout children={<QuantittiveFileUpload />} />
                     </RequireAuth>
                  }
               />

               <Route
                  path="/analysis"
                  element={
                     <RequireAuth>
                        <Layout children={<Analysis />} />
                     </RequireAuth>
                  }
               />
               <Route
                  path="/subscription"
                  element={
                     <RequireAuth>
                        <Layout children={<Subscription />} />
                     </RequireAuth>
                  }
               />
               <Route
                  path="/profile"
                  element={
                     <RequireAuth>
                        <Layout children={<BasicTabs />} />
                     </RequireAuth>
                  }
               />
               <Route
                  path="/dashboard/contact-us"
                  element={
                     <RequireAuth>
                        <Layout children={<DashboardContact />} />
                     </RequireAuth>
                  }
               />
               <Route path="/success-msg" element={<Success />} />
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </Suspense>
      </>
   );
}

export default App;
