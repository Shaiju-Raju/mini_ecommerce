import pool from "../config/db.js";

const createProductsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      price NUMERIC(10,2) NOT NULL,
      image_url TEXT,
      stock INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Products table ready ✅");
  } catch (error) {
    console.error("Error creating products table ❌", error);
  }
};

export default createProductsTable;
