import "./Checkout.css";
import { CartContext } from "../Components/CartContext";
import { useContext, useState } from "react";
import { currencyFormat } from "../utils/currency";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {

    const {
    subTotal,
    placeOrder,
    shippingData,
    setShippingData,
    cartCount,
    setCartCount,
    setSubTotal,
    shippingCharge,
    total
  } = useContext(CartContext);
  
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD");

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

    try {
      if (paymentMethod === "COD") {
        const data = await placeOrder({
            paymentMethod: "COD",
            paymentStatus: "PENDING"
        });
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
      } else {
        const {data} = await axios.post(
          "http://localhost:3000/api/payment/create-order",
          {amount : total}
        );

        const options = {
          key: "rzp_test_SYBRd1nRieDXVM",
          amount: data.amount,
          currency: "INR",
          name: "My Store",
          description: "Order Payment",
          order_id: data.id,

          handler: async function (response) {
            const verify = await axios.post(
              "http://localhost:3000/api/payment/verify-payment",
              response
            );

            if (verify.data.success) {
              const data = await placeOrder({
                paymentMethod: "ONLINE",
                paymentStatus: "PAID",
                paymentId: response.razorpay_payment_id
              });
                setCartCount(0);
                setSubTotal(0)
                setShippingData(prev => 
                  Object.keys(prev).reduce((acc, key) => {
                    acc[key] = "";
                    return acc;
                }, {})
              );
              navigate(`/orders/${data.order.id}`);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();


      }
    } catch (err) {
       navigate("/cart", {
        state: {
          error: err.response?.data
        }
      });
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
                <input type="radio"
                       name="payment"
                       checked={paymentMethod === "COD"}
                       onChange={() => setPaymentMethod("COD")}
                />

                <span>Cash on Delivery</span>
              </div>

              <div className="payment-card">
                <input type="radio"
                       name="payment"
                       checked={paymentMethod === "ONLINE"}
                       onChange={() => setPaymentMethod("ONLINE")} 
                />

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