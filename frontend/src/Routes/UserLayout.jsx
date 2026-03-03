import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default UserLayout;