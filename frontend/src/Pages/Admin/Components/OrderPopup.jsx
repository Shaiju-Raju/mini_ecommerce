
import { currencyFormat } from "../../../utils/currency";
import "./OrderPopup.css"
import { AdminContext } from "./AdminContext";
import { useContext, useEffect, useState } from "react";


export default function OrdersPopup({order, closePopup, userName}) {
  
  const {fetchOrderDetails} = useContext(AdminContext);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
  const getOrderDetails = async () => {
  const data = await fetchOrderDetails(order.id);
  console.log(order)
  setOrderItems(data.items);

  };

  if (order?.id) {
    getOrderDetails();
  }
}, [order]);



  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h3>Order Details #ORD{order?.id} </h3>
          
        </div>

        <div className="popup-body">
          <p><strong>Customer:</strong> {userName}</p>
          <p><strong>Status:</strong> {order?.status}</p>
          <p><strong>Total:</strong> {currencyFormat(Number(order?.sub_total) + Number(order?.shipping_charge))}</p>

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
              <tr>
                <td>{index + 1}</td>
                <td>{orderItem.title}</td>
                <td>{currencyFormat(orderItem.price)}</td>
                <td>{orderItem.quantity}</td>
                <td>{currencyFormat(Number(orderItem.price) * Number(orderItem.quantity))}</td>
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
                    Number(order?.sub_total) + Number(order?.shipping_charge)
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="popup-footer">
          <button className="close-btn-footer" onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
}