import { getOrCreateCart, addItem, removeFromCart,getFromCart, updateCart } from "../models/cart.model.js";

export async function addToCart (req, res) {

    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        const cart = await getOrCreateCart(userId);
        await addItem(cart.id, productId,quantity);
        const items = await getFromCart(cart.id);

        const totalItems = items.reduce((sum, item) => {
            return sum = sum + Number(item.quantity)
        },0)

        res.json({
            message: "Product added to cart",
            totalItems: totalItems,
        });

    } catch (err) {
        console.error("Error in Product insert ", err);
        res.status(500).json({ message: "Server error" });

    }
}

export async function removeItemFromCart (req, res) {
    const userId = req.user.id;
    const {productId} = req.params
    
    try {
        const cart = await getOrCreateCart(userId);

        await removeFromCart(cart.id, productId);
         res.json({ message: "Product removed from cart " });

    } catch (err) {
        console.error("Error removing item from cart", err);
        res.status(500).json({ error: "Failed to remove product from cart" });
    }
}

export async function getItemFromCart (req,res) {
    const userId = req.user.id;
    
    try {
       const cart = await getOrCreateCart(userId);
       const items = await getFromCart(cart.id);
      
       const total = items.reduce((sum, item) => {
        return sum = sum + Number(item.subtotal);
       },0)

       const totalItems = items.reduce((sum, item) => {
        return sum = sum + item.quantity;
       },0);

       res.json({items, total, totalItems});
    } catch (err) {
      console.error("Error to Fetch Items from DB",err);
      res.status(500).json({error: "Failed to fetch items"});

    }
}

export async function updateCartQty (req,res) {
    const {cart_item_id} = req.params;
    const {quantity} = req.body

    try {
        const result =     await updateCart(quantity, cart_item_id);
        res.json({ message: "Cart updated successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong",err });
    }
}