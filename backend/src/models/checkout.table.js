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

        await pool.query(`
            CREATE TABLE IF NOT EXISTS order_address (
            id SERIAL PRIMARY KEY,
            order_id INTEGER NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            address TEXT NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            postal_code VARCHAR(20) NOT NULL,
            country VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_order
                FOREIGN KEY(order_id)
                REFERENCES orders(id)
                ON DELETE CASCADE
        );
            `);

    } catch (err) {
        console.error("Error creating product table ❌", err);
        
    }
}    

export default  createCheckoutTable;
