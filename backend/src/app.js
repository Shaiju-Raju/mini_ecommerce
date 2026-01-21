import express from "express";
import createProductsTable from './models/product.table.js'
import productRoutes from "./routes/product.routes.js";
import cors from 'cors';

const app = express ();

//middleware
app.use(cors());

createProductsTable();

app.use(express.json());

app.use("/api/products",productRoutes);

app.get("/", (req, res) => {
  res.send("Mini E-Commerce Backend Running");
});



export default app;