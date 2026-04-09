import pool from "../config/db.js"

export const getOrdersByUser = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
    );
    return result.rows;
};

export const getOrderById = async (orderId) => {
    const result = await pool.query(
        "SELECT * FROM orders WHERE id = $1",
        [orderId]
    );
    return result.rows[0];
};

export const getOrderItems = async (orderId) => {
    const result = await pool.query (`
        SELECT oi.*, p.title, p.image_url
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1`,
    [orderId]
    );
    return result.rows;
} 

export const getAllOrdersModel = async () => {
    const result = await pool.query(
        "SELECT * FROM orders ORDER BY created_at DESC"
    );
    const ordersCount = await pool.query(
        "SELECT COUNT(*) FROM orders"
    );

    const totalRevenue = result.rows.reduce((sum, order) => {
        return sum + Number(order.total)
    },0)

    return {
        orders: result.rows,
        ordersCount: parseInt(ordersCount.rows[0].count),
        totalRevenue: totalRevenue
    } 
};

export const updateOrderStatusModel = async (orderId, status) => {

    const orderResult = await pool.query(
        "SELECT * FROM orders WHERE id = $1",
        [orderId]
    );

    const order = orderResult.rows[0];

    if(!order) {
        throw new Error("Order not found");
    }

    let paymentStatus = order.payment_status;

    if (
        order.payment_method === "COD" &&
        status.toLowerCase() === "delivered"
    ) {
        paymentStatus = "PAID";
    }
    
    const result = await pool.query(
        `UPDATE orders SET status = $1, payment_status = $2 
         WHERE id = $3
         RETURNING *`,
        [status,paymentStatus, orderId]
    );
    return result.rows[0];
};

export const getOrderAddress = async (orderId) => {
    const result = await pool.query(
        "SELECT * FROM order_address WHERE order_id=$1",
        [orderId]
    );
    return result.rows[0];
}
