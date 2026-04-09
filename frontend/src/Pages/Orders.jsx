import "./Order.css";
import { CartContext } from "../Components/CartContext";
import { useContext, useEffect, useState,} from "react";
import { currencyFormat } from "../utils/currency";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export default function Orders () {
  const {token,shippingCharge}   = useContext(CartContext);
  const navigate = useNavigate();
  const {orderId} = useParams();
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  


  useEffect(() => {
    const fetchOrder = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/api/orders/${orderId}`,
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
                <p>Payment Method: <strong>{order.payment_method}</strong></p>
                <p>Payment Status: <strong>{order.payment_status}</strong></p>
                {order.payment_id &&
                    <p>Payment id: <strong>{order.payment_id}</strong></p>
                }
                
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
                <span>{currencyFormat(order.sub_total)}</span>
            </div>

            <div className="summary-row">
                <span>Shipping</span>
                <span>{currencyFormat(order.shipping_charge)}</span>
            </div>

            <div className="summary-row total">
                <span>Total</span>
                <span>{currencyFormat(order.total)}</span>
            </div>

            <button className="continue-btn" onClick={() => navigate("/") }>
                Continue Shopping
            </button>
            </div>

        </div>
        </div>
    )
}
