import pool from "../config/db.js";

const createCheckoutTable = async () => {


    try {
        await pool.query (`
            CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            total NUMERIC NOT NULL,
            status VARCHAR(20) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        );

        await pool.query (`
            CREATE TABLE IF NOT EXISTS order_items (
            id SERIAL PRIMARY KEY,
            order_id INT REFERENCES orders(id) ON DELETE CASCADE,
            product_id INT REFERENCES products(id),
            quantity INT NOT NULL,
            price NUMERIC NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        )

    } catch (err) {
        console.error("Error creating product table ❌", err);
        
    }
}    

export default  createCheckoutTable;
