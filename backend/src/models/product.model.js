import pool from "../config/db.js";

export const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    return result.rows;
};


export const getProductById = async (id) => {
    const result =await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
    );
    return result.rows[0];
};


export const createProduct = async (product) => {
    const {title, description, price, image_url, stock} = product;

    const result = await pool.query(`
       INSERT INTO products (title, description, price, image_url, stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING * `,
       [title, description, price, image_url, stock]
    );

    return result.rows[0];
};

export const updateProduct = async (id, product) => {
    const {title, description, price, image_url, stock} = product;

    const result = await pool.query(`
       UPDATE products
       SET title=$1, description=$2, price=$3, image_url=$4, stock=$5
       WHERE id=$6 RETURNING *`,
       [title, description, price, image_url, stock, id]
    );

    return result.rows[0];
};


export const deleteProduct = async (id) => {
    const result = await pool.query(
        "DELETE FROM products WHERE id=$1",
        [id]
    );
};