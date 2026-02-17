import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const {cartCount, setCartCount, token, setToken } = useContext(CartContext);
  
  const navigate = useNavigate();
  const location = useLocation();


  function handleLogout () {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully", {
    autoClose: 2000,});
    navigate("/login");
  }

  function handleHomePage() {
    navigate("/");
  }

  useEffect(() => {
      if (!token) {
          setCartCount([]); 
      }
  }, [token]);



  return (
    <div className="navbar">
      <div className="nav-left">
        <h2 onClick={handleHomePage} className="logo">MyStore</h2>
      </div>

      {location.pathname === "/" && (
        <div className="nav-center">
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
          />
        </div>
      )}

      <div className="nav-right">
        {location.pathname === "/login" ? (
          <button className="login-btn" onClick={() => navigate("/signup")}>Signup</button>
        ) : token ? (
          <button className="login-btn" onClick={handleLogout}>Logout</button>
        ): (
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
        )
          
      }
        {!["/login", "/signup"].includes(location.pathname) && (
        <div className="cart-icon">
          🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
        )}

      </div>
    </div>
  );
}
