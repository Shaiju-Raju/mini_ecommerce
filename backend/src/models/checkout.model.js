import pool from "../config/db.js";

export const createOrder = async (userId,totalQuantity,shippingCharge, subTotal, total, paymentMethod, paymentStatus, paymentId) => {
    const result = await pool.query(`
        INSERT INTO orders (user_id, total_quantity,shipping_charge, sub_total, total, payment_method, payment_status, payment_id ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
    ,[userId,totalQuantity,shippingCharge, subTotal, total,paymentMethod, paymentStatus, paymentId || null]);

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

export const createOrderAddress = async (orderId, shippingData) => {

    const result = await pool.query(`INSERT INTO order_address 
        (order_id, full_name, phone_number, address, city, state, postal_code, country)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8 )RETURNING *
        `,[orderId, shippingData.fullName, shippingData.phoneNumber, shippingData.addressLine1, shippingData.city,
            shippingData.state, shippingData.postalCode, shippingData.country
         ]);

         return result.rows[0];
}


export const clearCart = async (cartId) => {
    await pool.query(
        "DELETE FROM cart_items WHERE cart_id = $1",
        [cartId]
    )
}