import pool from "../config/db.js";

 export const getOrCreateCart = async (userId) => {
    const cart = await pool.query(
        "SELECT * FROM carts WHERE user_id = $1",
        [userId]
    );

    if (cart.rows.length) return cart.rows[0];

    const newCart = await pool.query(
        "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
        [userId]
    );
    return newCart.rows[0];  
};

export const addItem = async (cart_id, product_id, quantity) => {
    const result = await pool.query(`
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (cart_id, product_id)
        DO UPDATE SET quantity = cart_items.quantity + $3
        RETURNING *;
        `, [cart_id, product_id, quantity || 1]);

    return result.rows[0];
}

export const removeFromCart = async (cart_id, product_id) => {
    const result = await pool.query(`
        DELETE FROM cart_items 
        WHERE cart_id = $1 AND product_id = $2`,
        [cart_id, product_id]  
    );
};

export const getFromCart = async (cart_id) => {
    const result = await pool.query(`
    SELECT    
        ci.id,
        ci.cart_id,
        ci.product_id,
        p.title,
        p.price,
        p.image_url,
        ci.quantity,
        (p.price * ci.quantity) AS subtotal
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = $1
    `, [cart_id]);
    

    return result.rows;
}

export const updateCart = async (qty, cart_item_id) => {
    const result = await pool.query(
        "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *", [qty, cart_item_id]
    );

    return result.rows [0]
}