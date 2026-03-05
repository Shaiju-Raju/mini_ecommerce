import { useContext, useState } from "react";
import "./AdminDashBoard.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Components/CartContext";
import { toast } from "react-toastify";
import AdminHome from "./AdminHome";
import AddProduct from "./AddProduct";



const AdminDashboard = () => {
  const navigate = useNavigate();
   const {setToken, user } = useContext(CartContext);
   const [activeSection, setActiveSection] = useState("dashboard");

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully", {
    autoClose: 1000,});
    navigate("/login");
  }

  

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="logo">Admin Panel</h2>

        <ul className="nav-links">
          <li onClick={() => setActiveSection("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveSection("addProduct")}>Add Product</li>
          <li>View Products</li>
          <li>Orders</li>
          <li className="logout" onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main Section */}
      <div className="admin-main">

        {/* Topbar */}
        <header className="admin-topbar">
          <h3>Welcome, {user}</h3>
        </header>

        {/* Content Area */}
        <div className="admin-content">
          
          {activeSection === "dashboard" && <AdminHome />}
          {activeSection === "addProduct" && <AddProduct />}

          </div>

        </div>

      </div>

  
  );
};

export default AdminDashboard;