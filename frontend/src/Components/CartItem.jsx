import { useContext, useEffect } from "react";
import { currencyFormat } from "../utils/currency";
import { CartContext } from "./CartContext";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

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

  async function handleQuantity (change) {
    const newQuantity = item.quantity + change
    try {

      if (newQuantity === 0) {
        await handleDelete();
        return;
      }
     

      await axios.put(
        `http://localhost:3000/api/cart/${item.id}`,{
          quantity: newQuantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchCart();

    } catch (err) {

       console.log("Update error", err);
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
            {item.quantity === 1 ? (
              <button
                className="qty-btn delete-icon-btn"
                onClick={handleDelete}
              >
                <FaTrash />
              </button>

            ) : (
              <button
                className="qty-btn"
                onClick={() => handleQuantity(-1)}
              >
                −
              </button>
            )}

            <span className="qty-number">{item.quantity}</span>
            <button className="qty-btn" onClick={() => handleQuantity(+1)} >+</button>
          </div>

          <button className="remove-btn" onClick={handleDelete}>Delete</button>
        </div>

      </div>
    </div>
  );
};


