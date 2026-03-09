import "./Orders.css";
import "./ViewProducts.css";

export default function Orders() {
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

          <tr>
            <td>1</td>
            <td>#ORD1021</td>
            <td>Rahul</td>
            <td>3</td>
            <td>₹2,450</td>
            <td><span className="order-status pending">Pending</span></td>
            <td>12 Mar 2026</td>
            <td>
              <button className="view-btn">View</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>#ORD1022</td>
            <td>Anil</td>
            <td>1</td>
            <td>₹900</td>
            <td><span className="order-status shipped">Shipped</span></td>
            <td>11 Mar 2026</td>
            <td>
              <button className="view-btn">View</button>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>#ORD1023</td>
            <td>Priya</td>
            <td>4</td>
            <td>₹5,200</td>
            <td><span className="order-status delivered">Delivered</span></td>
            <td>10 Mar 2026</td>
            <td>
              <button className="view-btn">View</button>
            </td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}