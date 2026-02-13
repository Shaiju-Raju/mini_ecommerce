import express from "express";
import createProductsTable from './models/product.table.js';
import createUsersTable from './models/users.table.js';
import createCartTables from "./models/cart.table.js";
import createCheckoutTable from "./models/checkout.table.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/users.routes.js";
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js";
import cors from 'cors';


const app = express ();

//middleware
app.use(cors());

createProductsTable();
createUsersTable();
createCartTables();
createCheckoutTable();

app.use(express.json());

app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


app.get("/", (req, res) => {
  res.send("Mini E-Commerce Backend Running");
});



export default app;