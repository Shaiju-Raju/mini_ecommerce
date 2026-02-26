import pool from "../config/db.js";

const createSettingsTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    shipping_rate DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    try {
        await pool.query(query);
    } catch (err) {
        console.error("Error creating settings table", err);
    }
}

export default createSettingsTable;