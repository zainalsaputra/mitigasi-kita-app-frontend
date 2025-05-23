import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("currentUser");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
