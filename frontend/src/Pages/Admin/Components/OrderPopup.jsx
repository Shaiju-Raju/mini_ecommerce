import { currencyFormat } from "../../../utils/currency";
import "./OrderPopup.css";
import { AdminContext } from "./AdminContext";
import { useContext, useEffect, useState } from "react";

export default function OrdersPopup({ order, closePopup, userName }) {

  const { fetchOrderDetails } = useContext(AdminContext);
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

  return (
    <div className="popup-overlay">
      <div className="popup-content">

        <div className="popup-header">
          <h3>Order Details #ORD{order?.id}</h3>
        </div>

        <div className="popup-body">

          <p><strong>Customer:</strong> {userName}</p>

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

            <button className="update-status-btn">
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