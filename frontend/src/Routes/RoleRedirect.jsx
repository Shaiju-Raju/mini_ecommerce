import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const RoleRedirect = ({children}) => {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const decode = jwtDecode(token);
            if (decode.role === "admin") {
                return <Navigate to="/admin/dashboard" />
            }
        } catch (err) {
            return children
        };
    };
    return children
};

export default RoleRedirect;