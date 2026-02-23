import "./Cart.css"
import { useContext, useEffect} from "react";
import { CartContext } from "../Components/CartContext";
import CartItem from "../Components/CartItem";
import { currencyFormat } from "../utils/currency";
import { useNavigate } from "react-router-dom";


export default function Cart () {
    const { cartItems, subTotal, fetchCart} = useContext(CartContext);
    const navigate = useNavigate();
    const shippingRate = 0.01;
    const shippingCharge = subTotal === 0 ? 0 : Math.round(subTotal * shippingRate);
    const total = subTotal + shippingCharge;

    useEffect(() => {
        fetchCart();
    },[])

    return (
        <div className="cart-page">
        <h2 className="cart-title">Your Cart</h2>

        <div className="cart-content">
            {/* LEFT SIDE - Items */}
              <div className="cart-items">

            {subTotal === 0 ? (
            <div className="empty-cart">
                <h2>Your Cart is Empty 🛒</h2>
                <p>Looks like you haven't added anything yet.</p>
                <button
                className="shop-btn"
                onClick={() => navigate("/")}
                >
                Continue Shopping
                </button>
            </div>
            ) : (
            cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
            ))
            )}

        </div>

            {/* RIGHT SIDE - Summary */}
            <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
                <span>Subtotal</span>
                <span>{currencyFormat(subTotal)}</span>
            </div>

            <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shippingCharge}</span>
            </div>

            <hr />

            <div className="summary-row total">
                <span>Total</span>
                <span>{currencyFormat(total)}</span>
            </div>

            <button className="checkout-btn"
             onClick={() => navigate("/checkout")}
             disabled={subTotal === 0}
             >

                Proceed to Checkout
            </button>
            </div>
        </div>
        </div>
    );
    };


