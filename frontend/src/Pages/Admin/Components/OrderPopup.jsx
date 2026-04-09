import { currencyFormat } from "../../../utils/currency";
import "./OrderPopup.css";
import { AdminContext } from "./AdminContext";
import { CartContext } from "../../../Components/CartContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

export default function OrdersPopup({ order, closePopup, userName, refreshOrders }) {

  const { fetchOrderDetails } = useContext(AdminContext);
  const {token} = useContext(CartContext);
  const [orderItems, setOrderItems] = useState([]);
  const [status, setStatus] = useState(order?.status || "");
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const getOrderDetails = async () => {
      const data = await fetchOrderDetails(order.id);
      setOrderItems(data.items);
      setAddress(data.address);
      console.log(data.address)
    };

    if (order?.id) {
      getOrderDetails();
      setStatus(order.status);
    }
  }, [order]);

  const handleUpdate = async() => {
    if(!token) {
      alert("Please login to add items");
      navigate("/login");
    return;
    }

    try {
      await axios.put(`${API_URL}/api/orders/admin/${order.id}`,
        {status},
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      refreshOrders();   // ✅ reload orders table
      closePopup(); 

      toast.success("Status updated Successfully", {
      autoClose: 800,});

    } catch (err) {
      console.log("error to update status", err);
    }


  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">

        <div className="popup-header">
          <h3>Order Details #ORD{order?.id}</h3>
        </div>

        <div className="popup-body">

          <p><strong>Customer:</strong> {userName}</p>
          <p><strong>Payment Method:</strong> {order.payment_method}</p>
          <p><strong>Payment Status:</strong> {order.payment_status}</p>
          {order.payment_id && 
          <p><strong>Payment id:</strong> {order.payment_id}</p>
          }
        

          {/* STATUS SECTION */}
          <div className="order-status-section">
            <strong>Status:</strong>

            <select
              className="status-dropdown"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            <button className="update-status-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>

          {/* SHIPPING ADDRESS */}
          <div className="shipping-address">
            <h4>Shipping Address</h4>

            <p>{address.address}</p>
            <p>{address.city}</p>
            <p>{address.state}, {address.postal_code}</p>
            <p>{address.country}</p>
            <p>{address.phone_number}</p>
          </div>

          {/* ITEMS TABLE */}
          <h4>Items Ordered:</h4>

          <table className="items-table">

            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {orderItems.map((orderItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{orderItem.title}</td>
                  <td>{currencyFormat(orderItem.price)}</td>
                  <td>{orderItem.quantity}</td>
                  <td>
                    {currencyFormat(
                      Number(orderItem.price) * Number(orderItem.quantity)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="table-total">

              <tr>
                <td colSpan="4" className="total-label">Net Total</td>
                <td>{currencyFormat(order?.sub_total)}</td>
              </tr>

              <tr>
                <td colSpan="4" className="total-label">Shipping Charge</td>
                <td>{currencyFormat(order?.shipping_charge)}</td>
              </tr>

              <tr className="grand-total-row">
                <td colSpan="4" className="total-label">Grand Total</td>
                <td>
                  {currencyFormat(
                    Number(order?.sub_total) +
                    Number(order?.shipping_charge)
                  )}
                </td>
              </tr>

            </tfoot>

          </table>

        </div>

        <div className="popup-footer">
          <button
            className="close-btn-footer"
            onClick={closePopup}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}