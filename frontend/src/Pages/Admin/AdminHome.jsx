import "./AdminDashBoard.css";
import { currencyFormat } from "../../utils/currency";
import { useContext } from "react";
import{AdminContext} from "../Admin/Components/AdminContext"

export default function AdminHome () {
    const {productsCount,ordersCount, totalRevenue, userCount} = useContext(AdminContext);

    return (
    <div className="stats-grid">
        <div className="stat-card">
            <h4>Total Products</h4>
            <p>{productsCount}</p>
        </div>

        <div className="stat-card">
            <h4>Total Orders</h4>
            <p>{ordersCount}</p>
        </div>

        <div className="stat-card">
            <h4>Total Users</h4>
            <p>{userCount}</p>
        </div>

        <div className="stat-card">
            <h4>Total Revenue</h4>
            <p>{currencyFormat (totalRevenue)}</p>
        </div>

    </div>
    )

}