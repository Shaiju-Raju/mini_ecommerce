import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {

    const token = localStorage.getItem("token");
    if(!token) return <Navigate to="/login" />;

    const decode = jwtDecode (token);

    if(decode.role !=="admin") {
        return <Navigate to="/" />;
    };

    return children;
};

export default AdminRoute;