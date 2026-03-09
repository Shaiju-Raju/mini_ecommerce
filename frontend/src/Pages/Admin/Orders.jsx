import "./Orders.css";
import "./ViewProducts.css";
import { AdminContext } from "./Components/AdminContext";
import { useContext, useEffect, useState } from "react";
import { currencyFormat } from "../../utils/currency";
import { formatDateTime } from "../../utils/date";

export default function Orders() {
    const {fetchOrders, fetchUserDetails} =useContext(AdminContext);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState ([]);

    // Fetching all Orders
    useEffect (() => {
        const getOrders = async () => {
            setOrders(await fetchOrders())
        }
        getOrders();
    },[])

    //Fetching all user details
    useEffect( () => {
        const getUsers = async () => {
            setUsers(await fetchUserDetails());
        }
        getUsers();
    },[])


  return (
    <div className="view-products">

      <h2>Orders</h2>

      <table className="product-table">

        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
          <tr key={order.id}>
            
            <td>{index +1}</td>
            <td>{`#ORD${order.id}`}</td>
            <td>{users.find(user => user.id === order.user_id)?.name || "Unknown"}</td>
            <td>{order.total_quantity}</td>
            <td>{currencyFormat(Number(order.sub_total) + Number(order.shipping_charge))}</td>
            <td><span className="order-status pending">{order.status}</span></td>
            <td>{formatDateTime(order.created_at)}</td>
            <td>
              <button className="view-btn">View</button>
            </td>
          </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}