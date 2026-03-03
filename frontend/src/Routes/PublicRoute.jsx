import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token);

    if (decoded.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default PublicRoute;