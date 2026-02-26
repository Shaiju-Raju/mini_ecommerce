import { useContext, useEffect, useState } from "react";
import "./OrderHistory.css";
import axios from "axios";
import { CartContext } from "../Components/CartContext";
import { currencyFormat } from "../utils/currency";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const {token} = useContext(CartContext);
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const formatDateTime = (dateString) => {
  const date = new Date(dateString.replace(" ", "T"));

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).replace(",", " at");
};



useEffect (() => {
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      setOrders(response.data);

    } catch (err) {
      console.err("Error in Fetching Orders",err);
    }
  }
  fetchOrders();
},[token])




  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      <div className="orders-list">

        {/* Single Order Card */}
        {orders.map (order => (
          <div className="order-card" key={order.id}>
            <div className="order-top">
              <div>
                <p className="order-id">Order #{order.id}</p>
                <p className="order-date">Placed on: {formatDateTime(order.created_at)}</p>
              </div>

              <div className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </div>
            </div>

            <div className="order-middle">
              <p>Total: {currencyFormat(order.total)} </p>
              <p>Items: {order.total_quantity}</p>
            </div>

            <div className="order-bottom">
              <button className="view-btn" onClick={() => navigate(`order_details/${order.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}