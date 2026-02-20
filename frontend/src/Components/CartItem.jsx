import { useContext, useEffect } from "react";
import { currencyFormat } from "../utils/currency";
import { CartContext } from "./CartContext";
import axios from "axios";

export default function CartItem ({item}) {
const {token, fetchCart}  = useContext(CartContext);

 async function handleDelete() {
    try {
      await axios.delete(
        `http://localhost:3000/api/cart/${item.product_id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      fetchCart();
      
      
    } catch (err) {
      console.log("Delete error", err);

    }
   
  }

  return (
    <div className="cart-item">

      {/* Product Image */}
      <div className="cart-image">
        <img src={item.image_url} alt={item.title} />
      </div>

      {/* Product Info */}
      <div className="cart-info">

        <div className="cart-top">
          <div>
            <h4 className="item-title">{item.title}</h4>
            <p className="item-description">
              {item.description}
            </p>
            <p className="stock-text">In Stock</p>
          </div>

          <p className="item-price">{currencyFormat(item.price)}</p>
        </div>

        <div className="cart-actions">
          <div className="quantity-box">
            <button className="qty-btn">−</button>
            <span className="qty-number">{item.quantity}</span>
            <button className="qty-btn">+</button>
          </div>

          <button className="remove-btn" onClick={handleDelete}>Delete</button>
        </div>

      </div>
    </div>
  );
};


