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
    return result.rows;
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
    return result.rows;
};

export const updateOrderStatusModel = async (orderId, status) => {
    const result = await pool.query(
        "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
        [status, orderId]
    );
    return result.rows[0];
};
