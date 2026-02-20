import "./Cart.css"
import { useContext, useEffect} from "react";
import { CartContext } from "../Components/CartContext";
import CartItem from "../Components/CartItem";
import { currencyFormat } from "../utils/currency";


export default function Cart () {
    const { cartItems, subTotal, fetchCart} = useContext(CartContext);

    useEffect(() => {
        fetchCart();
    },[])

    return (
        <div className="cart-page">
        <h2 className="cart-title">Your Cart</h2>

        <div className="cart-content">
            {/* LEFT SIDE - Items */}
            <div className="cart-items">
            
            {cartItems.map((item) => (
                <CartItem key={item.id} item = {item}/>
            ))}

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
                <span>₹100</span>
            </div>

            <hr />

            <div className="summary-row total">
                <span>Total</span>
                <span>{currencyFormat(subTotal+100)}</span>
            </div>

            <button className="checkout-btn">
                Proceed to Checkout
            </button>
            </div>
        </div>
        </div>
    );
    };


