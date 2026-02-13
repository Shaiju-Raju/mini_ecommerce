import pool from "../config/db.js";

export const createOrder = async (userId, total) => {
    const result = await pool.query(`
        INSERT INTO orders (user_id, total) 
        VALUES ($1, $2) RETURNING *`
    ,[userId, total]);

    return result.rows[0];
}

export const createOrderItems = async (orderId, items) => {
    for (const item of items) {
        await pool.query (`
            INSERT INTO order_items
            (order_id, product_id, quantity, price)
            VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
        );
    }
}


export const clearCart = async (cartId) => {
    await pool.query(
        "DELETE FROM cart_items WHERE cart_id = $1",
        [cartId]
    )
}