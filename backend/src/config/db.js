import pkg from 'pg';
import dotenv from 'dotenv'
// import dns from "dns";

dotenv.config();

const { Pool } = pkg;

// 🔥 Force Node to prefer IPv4 globally
// dns.setDefaultResultOrder("ipv4first");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432, // default PostgreSQL port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    },
    // family: 4,
});

export default pool