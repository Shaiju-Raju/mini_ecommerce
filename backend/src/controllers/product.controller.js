import * as Product from "../models/product.model.js";

export async function getProducts(req, res) {
    try {
        const product = await Product.getAllProducts();
        res.json(product);
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    };
};


export async function getProduct (req, res) {
    try {
        const product = await Product.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    };
};


export async function addProduct (req, res) {
    try {
        const product = await Product.createProduct(req.body);
        res.status(201).json({product}); 
    } catch (err) {
        res.status(400).json({message: "Invalid data"});
    };
};


export async function editProduct (req, res) {
    try {
        const product = await Product.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({message: "Upation failed"});
    };
};


export async function removeProduct (req, res) {
    try {
        await Product.deleteProduct(req.params.id);
        res.json({message: "Product Deleted"});
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    };
};


