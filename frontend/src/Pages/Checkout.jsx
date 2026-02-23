import "./Checkout.css";
import { CartContext } from "../Components/CartContext";
import { useContext, useState } from "react";
import { currencyFormat } from "../utils/currency";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const {subTotal, placeOrder,shippingData,setShippingData,cartCount, setCartCount, setSubTotal}   = useContext(CartContext);
  const navigate = useNavigate();
  const shippingRate = 0.01;
  const shippingCharge = Math.round(subTotal * shippingRate);
  const total = subTotal + shippingCharge;

  const handleChange= (e) => {
    const {name, value} = e.target;

    setShippingData((prev) => ({
      ...prev,
      [name]:value,
    }));
  }


  
  async function handleOrder () {
    const isEmpty = Object.values(shippingData).some(
      value => value.trim() === ""
    );

    if (isEmpty) {
        alert("All fields are required");
    return;
    }

    if(cartCount === 0) {
      alert("Your cart is empty");
      return;
    }
      const data = await placeOrder();
      setCartCount(0);
      setSubTotal(0)
      setShippingData(prev => 
        Object.keys(prev).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {})
      );
      
      if(data) {
        navigate(`/orders/${data.order.id}`);
      }
  }

  return (

    <div className="checkout-page">
      <h2 className="checkout-title">Secure Checkout</h2>

      <div className="checkout-content">

        {/* LEFT SIDE */}
        <div className="checkout-left">

          {/* Shipping Section */}
          <div className="checkout-section">
            <div className="section-header">
              <span className="section-number">1</span>
              <h3>Shipping Address</h3>
            </div>

            <div className="form-grid">
              <input type="text" placeholder="Full Name" name="fullName" value={shippingData.fullName} onChange={handleChange}/>
              <input type="text" placeholder="Phone Number" name="phoneNumber" value={shippingData.phoneNumber} onChange={handleChange} />

              <input className="full-width" type="text" placeholder="Address Line 1" name="addressLine1" value={shippingData.addressLine1} onChange={handleChange}/>

              <input type="text" placeholder="City" name="city" value={shippingData.city} onChange={handleChange} />
              <input type="text" placeholder="State" name="state" value={shippingData.state} onChange={handleChange} />

              <input type="text" placeholder="Postal Code" name="postalCode" value={shippingData.postalCode} onChange={handleChange} />
              <input type="text" placeholder="Country" name="country" value={shippingData.country} onChange={handleChange}/>
            </div>
          </div>

          {/* Payment Section */}
          <div className="checkout-section">
            <div className="section-header">
              <span className="section-number">2</span>
              <h3>Payment Method</h3>
            </div>

            <div className="payment-options">
              <div className="payment-card active">
                <input type="radio" name="payment" defaultChecked />
                <span>Cash on Delivery</span>
              </div>

              <div className="payment-card">
                <input type="radio" name="payment" />
                <span>Credit / Debit Card</span>
              </div>

              <div className="payment-card">
                <input type="radio" name="payment" />
                <span>UPI / Net Banking</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{currencyFormat(subTotal)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{currencyFormat(shippingCharge)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{currencyFormat(total)}</span>
          </div>

          <button className="place-order-btn" onClick={handleOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}