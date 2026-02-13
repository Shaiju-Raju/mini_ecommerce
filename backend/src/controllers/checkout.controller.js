import { getOrCreateCart, getFromCart } from "../models/cart.model.js";
import { createOrder,createOrderItems,clearCart } from "../models/checkout.model.js";


export async function checkout (req, res) {

    const userId = req.user.id;

    try {
        const cart = await getOrCreateCart(userId);
        const items = await getFromCart(cart.id);

        if(!items.length) {
            return res.status(400).json({message: "Cart Empty"});
            
        }

        const total = items.reduce((sum, item) => {
            return sum + Number(item.subtotal);
        }, 0);

    // Create Order
    const order = await createOrder(userId, total);

    // Insert Order Items
    await createOrderItems(order.id, items);

    // Clear Cart
    await clearCart(cart.id)

    res.json({
        message: "Order placed successfully",
        order
    });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Checkout failed"});
    }
}