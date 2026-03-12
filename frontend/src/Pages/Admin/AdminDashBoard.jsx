import { useContext, useState } from "react";
import "./AdminDashBoard.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Components/CartContext";
import { toast } from "react-toastify";
import AdminHome from "./AdminHome";
import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProducts";
import Orders from "./Orders";



const AdminDashboard = () => {
  const navigate = useNavigate();
   const {setToken, user } = useContext(CartContext);
   const [activeSection, setActiveSection] = useState("dashboard");
   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully", {
    autoClose: 1000,});
    navigate("/login");
  }

  

  return (
    <div className={`admin-container ${isMobileNavOpen ? "nav-open" : ""}`}>

      <div
        className={`admin-overlay ${isMobileNavOpen ? "show" : ""}`}
        onClick={() => setIsMobileNavOpen(false)}
      ></div>

      <header className="admin-mobilebar">
        <h2 className="logo">Admin Panel</h2>
        <button
          type="button"
          className="admin-menu-btn"
          aria-label="Menu"
          onClick={() => setIsMobileNavOpen((v) => !v)}
        >
          {"\u2630"}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileNavOpen ? "open" : ""}`}>
        <h2 className="logo">Admin Panel</h2>

        <ul className="nav-links">
          <li onClick={() => { setActiveSection("dashboard"); setIsMobileNavOpen(false); }}>Dashboard</li>
          <li onClick={() => { setActiveSection("addProduct"); setIsMobileNavOpen(false); }}>Add Product</li>
          <li onClick={() => { setActiveSection("viewProducts"); setIsMobileNavOpen(false); }}>View Products</li>
          <li onClick={() => { setActiveSection("orders"); setIsMobileNavOpen(false); }}>Orders</li>
          <li className="logout" onClick={() => { handleLogout(); setIsMobileNavOpen(false); }}>Logout</li>
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
          {activeSection === "viewProducts" && <ViewProducts />}
          {activeSection === "orders" && <Orders />}


          </div>

        </div>

      </div>

  
  );
};

export default AdminDashboard;
