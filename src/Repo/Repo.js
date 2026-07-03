// src/Repo/Repo.js
import Repository from "./Repository";

const api = {
   // 🔐 Authentication
   signup(payload) {
      return Repository.post("/signup", payload);
   },
   login(payload) {
      return Repository.post("/login", payload);
   },
   signupVerificationEmail(payload) {
      return Repository.post("/verification-email", payload);
   },
   signupVerificationCode(payload) {
      return Repository.post("/verify-code", payload);
      //  return Repository.post("/verification-email", payload);
   },
   forgotPasswordUser(payload) {
      return Repository.post("/forgot-password", payload);
   },

   // 👤 User Profile
   getUser(payload) {
      return Repository.post("/get-user", payload);
   },
   updateUser(payload) {
      return Repository.post("/update-user", payload);
   },
   deleteAccount(payload) {
      return Repository.post("/delete-account", payload);
   },

   // 💳 Subscription & Billing
   CreateCheckOutSession(payload) {
      return Repository.post("/create-checkout-session", payload);
   },
   createPortalSession(payload) {
      return Repository.post("/create-portal-session", payload);
   },
   CancelSubscription(payload) {
      return Repository.post("/cancel-subscription", payload);
   },

   // 📤 File Uploads
   uploadFile(payload) {
      return Repository.post("/upload", payload);
   },

   // 📨 Enquiries
   userEnquiry(payload) {
      return Repository.post("/user-enquiry", payload);
   },

   // 💰 Payment History
   paymentHistory(payload) {
      return Repository.post("/payment-history", payload);
   },

   // 📬 Success Link API
   successLink(payload) {
      return Repository.post("/success", payload);
   },
};

export default api;
