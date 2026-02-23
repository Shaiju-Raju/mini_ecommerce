import "./Order.css";
import { CartContext } from "../Components/CartContext";
import { useContext, useEffect, useState,} from "react";
import { currencyFormat } from "../utils/currency";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";


export default function Orders () {
  const {token}   = useContext(CartContext);
  const navigate = useNavigate();
  const {orderId} = useParams();
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const shippingRate = 0.01;


  useEffect(() => {
    const fetchOrder = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/orders/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            setOrder(res.data.order);
            setAddress(res.data.address);
        } catch (err) {
            console.error(err);
        }
    }
    fetchOrder(); 
  },[orderId]);



    if (!order || !address) return <p>Loading...</p>;
  

    return (
        <div className="order-confirm-page">
        <h1 className="order-confirm-title">Order Confirmation</h1>

        <div className="order-confirm-content">

            {/* -- LEFT SIDE -- */}
            <div className="order-confirm-left">

            {/* !-- Success Message -- */}
            <div className="order-card success-card">
                <h2>🎉 Thank You! Your Order Has Been Placed</h2>
                <p>Your Order ID: <strong>#ORD{order.id}</strong></p>
                <p className="order-status">Status: {order.status}</p>
                <p className="delivery-msg">
                Your order will be delivered to the address below.
                </p>
            </div>

            {/* -- Delivery Address -- */}
            <div className="order-card">
                <h2>Delivery Address</h2>
                <p className="order-name">{address.full_name}</p>
                <p>{address.address}</p>
                <p>{address.city}</p>
                <p>{address.state} - {address.postal_code}</p>
                <p>{address.country}</p>
                <p className="order-phone">{address.phone_number}</p>
            </div>

            </div>

            {/* -- RIGHT SIDE SUMMARY -- */}
            <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
                <span>Subtotal</span>
                <span>{currencyFormat(order.total)}</span>
            </div>

            <div className="summary-row">
                <span>Shipping</span>
                <span>{currencyFormat((order.total) * shippingRate)}</span>
            </div>

            <div className="summary-row total">
                <span>Total</span>
                <span>{currencyFormat(Number(order.total) + (order.total * shippingRate))}</span>
            </div>

            <button className="continue-btn" onClick={() => navigate("/") }>
                Continue Shopping
            </button>
            </div>

        </div>
        </div>
    )
}
