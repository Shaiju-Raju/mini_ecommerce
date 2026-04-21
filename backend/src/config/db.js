import pkg from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const { Pool } = pkg;

// 🔥 Force Node to prefer IPv4 globally
dns.setDefaultResultOrder("ipv4first");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    family: 4,
});

export default pool