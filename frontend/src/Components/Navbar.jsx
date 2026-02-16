import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Navbar() {
  const { cartCount } = useContext(CartContext);

  return (
    <div className="navbar">
      <div className="nav-left">
        <h2 className="logo">MyStore</h2>
      </div>

      <div className="nav-center">
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
        />
      </div>

      <div className="nav-right">
        <button className="login-btn">Login</button>

        <div className="cart-icon">
          🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}
