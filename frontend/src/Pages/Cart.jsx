import "./Cart.css"
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Components/CartContext";
import axios from "axios";
import CartItem from "../Components/CartItem";

export default function Cart () {
    const {token} = useContext(CartContext);
    const [subTotal, setSubTotal] = useState(0);
    const [items, setItems] = useState([]);

    function currencyFormat(value) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR"
        }).format(value);
    }

    
    useEffect ( () => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/cart",{
                        headers:{
                            Authorization: `Bearer ${token}`
                        },
                    });

                    setSubTotal(response.data.total)
                    setItems(response.data.items);
                    console.log(response.data)

            } catch (err) {
                console.log("Fetch cart error", err);
            }
        }
        fetchCart();
    },[token])
 
    return (
        <div className="cart-page">
        <h2 className="cart-title">Your Cart</h2>

        <div className="cart-content">
            {/* LEFT SIDE - Items */}
            <div className="cart-items">
            
            {items.map((item) => (
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


