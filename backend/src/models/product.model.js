import pool from "../config/db.js";


// For Admin Only
export const getAllProducts = async (page = 1, limit= 8, search = "") => {

    const offset = (page -1) * limit;

    let countQuery = "SELECT COUNT(*) FROM products";
    let dataQuery ="SELECT * FROM products";
    let values = [];

    

    if(search) {
        countQuery += " WHERE title ILIKE $1";
        dataQuery += " WHERE title ILIKE $1";
        values.push(`%${search}%`);
    }

    //Count Query
    const countResult = await pool.query(countQuery,values);
    const totalProducts = countResult.rows[0].count;
    const totalPages = Math.ceil(totalProducts/limit);

    //Pagination

    if(search) {
        dataQuery += " ORDER BY created_at DESC LIMIT $2 OFFSET $3";
        values.push(limit,offset)
    } else {
        dataQuery += " ORDER BY is_active DESC LIMIT $1 OFFSET $2";
        values.push(limit,offset);
    }


    
    const result = await pool.query(dataQuery, values);

    return {
        products: result.rows,
        totalProducts,
        totalPages,
        currentPage: page,
    }
};


// For User Login
export const activeProducts = async (page = 1, limit= 8, search = "") => {

    const offset = (page -1) * limit;

    let countQuery = "SELECT COUNT(*) FROM products WHERE is_active = true";
    let dataQuery ="SELECT * FROM products WHERE is_active = true";
    let values = [];

    

    if(search) {
        countQuery += " AND title ILIKE $1";
        dataQuery += " AND title ILIKE $1";
        values.push(`%${search}%`);
    }

    //Count Query
    const countResult = await pool.query(countQuery,values);
    const totalProducts = countResult.rows[0].count;
    const totalPages = Math.ceil(totalProducts/limit);

    //Pagination

    if(search) {
        dataQuery += " ORDER BY created_at DESC LIMIT $2 OFFSET $3";
        values.push(limit,offset)
    } else {
        dataQuery += " ORDER BY created_at DESC LIMIT $1 OFFSET $2";
        values.push(limit,offset);
    }


    
    const result = await pool.query(dataQuery, values);

    return {
        products: result.rows,
        totalProducts,
        totalPages,
        currentPage: page,
    }
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


    export const updateProductStatus = async (id, is_active) => {

    const query = `
        UPDATE products
        SET is_active = $1
        WHERE id = $2
        RETURNING *;
    `;

    const result = await pool.query(query, [is_active, id]);

    return result.rows[0];
    };