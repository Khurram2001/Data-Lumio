// RouteGuards.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// For public routes (login, signup, landing) to redirect to dashboard if logged in
export const RedirectIfLoggedIn = ({ children }) => {
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
   return isLoggedIn ? <Navigate to="/welcome" /> : children;
};

// For dashboard/private routes
export const RequireAuth = ({ children }) => {
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
   return isLoggedIn ? children : <Navigate to="/" />;
};
