import * as Product from "../models/product.model.js";

// For Admin Login
export async function getProducts(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8 ;
        const search = req.query.search || "";

        const product = await Product.getAllProducts(page, limit, search);
        res.status(200).json(product);
        
        
    } catch (err) {
        console.error("Get Products Error:", err);
        res.status(500).json({ message: "Server Error" });
    };
};

// For User Login
export async function getActiveProducts(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8 ;
        const search = req.query.search || "";

        const product = await Product.activeProducts(page, limit, search);
        res.status(200).json(product);
        
        
    } catch (err) {
        console.error("Get Products Error:", err);
        res.status(500).json({ message: "Server Error" });
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


    export const toggleProductStatus = async (req, res) => {
    const { id } = req.params;
    const { is_active } = req.body;

    try {
        const updatedProduct = await Product.updateProductStatus(id, is_active);

        res.status(200).json({
        message: "Product status updated successfully",
        product: updatedProduct
        });

    } catch (err) {
        console.error("Error updating product status:", err);
        res.status(500).json({
        message: "Server error while updating product status"
        });
    }
    };


