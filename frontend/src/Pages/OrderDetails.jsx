import { useContext, useEffect, useState } from "react";
import "./OrderDetails.css"
import axios from "axios";
import { CartContext } from "../Components/CartContext";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../utils/date";
import { currencyFormat } from "../utils/currency";


export default function OrderDetails () {
    const {token} = useContext(CartContext);
    const {id} = useParams();
    const [address, setAddress] = useState({});
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState({});

    
useEffect (() => {
    const fetchOrderDetails = async () => {
        
        try {
            const response = await axios.get(`http://localhost:3000/api/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            } );
            console.table(response.data.items);
            setAddress(response.data.address);
            setItems(response.data.items);
            setOrder(response.data.order);

            
        } catch (err) {
            console.log("Error in fetching Order", err);
        }
    }
    if (id && token) {
        fetchOrderDetails();
    }
},[id,token]);

    return (

        <div className="order-page">

        {/* HEADER */}
        <div className="order-details-card">
            <div className="header-row">
            <h2>Order #{order.id}</h2>
            <span className={`status ${order.status?.toLowerCase()}`}>{order.status}</span>
            </div>

            <div className="details-row">
            <p><strong>Placed On: {formatDateTime(order.created_at)}</strong> </p>
            
            </div>
        </div>

        {/* ADDRESS + SUMMARY GRID */}
        <div className="info-grid">

            {/* DELIVERY ADDRESS */}
            <div className="info-card">
            <h3>Delivery Address</h3>
            <p><strong>{address.full_name}</strong></p>
            <p>{address.address}</p>
            <p>{address.city} {address.postal_code}</p>
            <p>{address.country}</p>
            <p>Phone: {address.phone_number}</p>
            </div>

            {/* ORDER SUMMARY */}
            <div className="info-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
                <span>Total Items</span>
                <span>{order.total_quantity}</span>
            </div>
            <div className="summary-row">
                <span>Subtotal</span>
                <span>{currencyFormat(order.total)}</span>
            </div>
            <div className="summary-row">
                <span>Shipping</span>
                <span>₹100</span>
            </div>
            <div className="summary-row total">
                <span>Total</span>
                <span>₹1,499</span>
            </div>
            </div>

        </div>

        {/* PRODUCTS SECTION */}
        <div className="items-section">
            <h3>Ordered Items</h3>

            {items.map(item => (
            <div className="item-card" key={item.id}>
            <img src={item.image_url} alt="Product" />
            <div className="item-info">
                <h4>{item.title}</h4>
                <p>{currencyFormat(item.price)}</p>
                <p>Qty: {item.quantity}</p>
                <p className="subtotal">Subtotal: {currencyFormat(Number(item.quantity) * Number(item.price))}</p>
            </div>
            </div>
            ))}
           

        </div>

        </div>
    )

}