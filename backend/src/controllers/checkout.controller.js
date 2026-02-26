import { getOrCreateCart, getFromCart } from "../models/cart.model.js";
import { createOrder,createOrderItems,clearCart,createOrderAddress } from "../models/checkout.model.js";


export async function checkout (req, res) {
    const userId = req.user.id;
    const shippingData= req.body;

    try {

        const cart = await getOrCreateCart(userId);
        const items = await getFromCart(cart.id);

        if(!items.length) {
            return res.status(400).json({message: "Cart Empty"});
            
        }

        const total = items.reduce((sum, item) => {
            return sum + Number(item.subtotal);
        }, 0);

        const totalQuantity = items.reduce((sum, item) => {
            return sum + Number(item.quantity);
        },0);


    // Create Order
    const order = await createOrder(userId,totalQuantity, total);
 
    // Insert Order Items & Address
    await createOrderItems(order.id, items);
    const address= await createOrderAddress(order.id, shippingData)

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