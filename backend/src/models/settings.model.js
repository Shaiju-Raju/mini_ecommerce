import pool  from "../config/db.js";

export const getSettings = async () => {
    const result = await pool.query("SELECT * FROM settings LIMIT 1");
    return result.rows[0];
}

export const updateShippingRate = async () => {
    const result = await pool.query(`
        UPDATE settings SET shipping_rate = $1, update_at = NOW() WHER ID = 1 RETURNING *
        `,[rate]);

        return result.rows[0];
}