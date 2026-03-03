import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const UserRoute = ({ children}) => {
    const token = localStorage.getItem("token");

    if(!token) return <Navigate to="/login" />;

    const decode = jwtDecode(token);

    if(decode.role !== "user") {
        return <Navigate to="/admin/dashboard" />
    }

    return children;
};

export default UserRoute;