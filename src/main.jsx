import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { ToastContainer } from "react-toastify";
import App from "./App"; // Your main App component
import "./index.css"; // Your styles
import { Provider } from "react-redux";
import { store } from "./store";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
   // <React.StrictMode>
   <>
      <Provider store={store}>
         <HelmetProvider>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </HelmetProvider>
      </Provider>
      <ToastContainer theme="dark" />
   </>
   // </React.StrictMode>
);
