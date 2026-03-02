import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const {cartCount, setCartCount, token, setToken, user } = useContext(CartContext);
  const [search, setSearch] = useState("");
  
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

  function handleCart () {
    if (token) {
      navigate("/cart");
    } else if (!token) {
      alert("Please login to view cart");
    }
  }

  function handleSearch() {
    navigate(`/?search=${search}&page=1`);
    setSearch("")

  }

  console.log(search)

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
        <div className="search-container">
          <input
            value={search}
            type="text"
            placeholder="Search products..."
            className="search-bar"
            onChange={(e)=> setSearch(e.target.value)}
          />
          <button className="search-icon-btn" onClick={handleSearch} >
            🔍
          </button>
        </div>
      </div>
    )}

        <div className="nav-right">

          {!["/login", "/signup"].includes(location.pathname) && (
            <span className="welcome-text">Welcome, {user} 👋</span>
          )}

          {token&& (
          <div className="profile-container">
            <div className="profile-btn">Profile ▾</div>

            <div className="profile-dropdown">
              <div className="dropdown-item" onClick={() => navigate("/order_history")}>Order History</div>
              
              <div className="dropdown-item" onClick={token? handleLogout: null}>Logout</div>
            </div>
         </div>
          )}




          {location.pathname === "/login" ? (
            <button className="login-btn" onClick={() => navigate("/signup")}>Signup</button>
          ) : !token ? (
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          ) : null}

          {!["/login", "/signup"].includes(location.pathname) && (
            <div className="cart-icon" onClick={handleCart}>
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
