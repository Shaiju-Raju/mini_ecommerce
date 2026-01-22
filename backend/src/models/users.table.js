import pool from "../config/db.js";

const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;


    try {
        await pool.query(query);
        console.log("Users table ready ✅");
    } catch (err) {
        console.error("Error creating product table ❌", err);
    }
}

export default  createUsersTable;
