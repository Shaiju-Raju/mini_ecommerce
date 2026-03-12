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
      <div className="nav-logo-row">
        <h2 onClick={handleHomePage} className="logo">My Store</h2>
      </div>

      {location.pathname === "/" && (
        <div className="nav-search-row">
          <div className="search-container">
            <input
              value={search}
              type="text"
              placeholder="Search products..."
              className="search-bar"
              onChange={(e)=> setSearch(e.target.value)}
            />
            <button className="search-icon-btn" onClick={handleSearch} aria-label="Search">
              {"\u{1F50D}"}
            </button>
          </div>
        </div>
      )}

      {!["/login", "/signup"].includes(location.pathname) && (
        <div className="nav-welcome-row">
          <span className="welcome-text welcome-mobile">Welcome, {user} {"\u{1F44B}"}</span>
        </div>
      )}

      <div className="nav-actions-row">
        <div className="nav-actions-left">
          {!["/login", "/signup"].includes(location.pathname) && (
            <div className="cart-icon cart-mobile" onClick={handleCart} aria-label="Cart">
              {"\u{1F6D2}"}
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
          )}
        </div>

        <div className="nav-actions-right">
          {!["/login", "/signup"].includes(location.pathname) && (
            <span className="welcome-text welcome-desktop">Welcome, {user} {"\u{1F44B}"}</span>
          )}

          {!["/login", "/signup"].includes(location.pathname) && (
            <div className="cart-icon cart-desktop" onClick={handleCart} aria-label="Cart">
              {"\u{1F6D2}"}
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
          )}

          {token&& (
          <div className="profile-container">
            <div className="profile-btn">Profile {"\u25BE"}</div>

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

        </div>

      </div>

    </div>
  );
}
