import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import createProductsTable from './models/product.model.js';

dotenv.config();

const PORT = process.env.PORT
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Mini E-Commerce Backend Running");
});

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.log("DB Connection Failed", err);
    } else {
        console.log("DB Connection done successfully");
    };
});

createProductsTable();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});