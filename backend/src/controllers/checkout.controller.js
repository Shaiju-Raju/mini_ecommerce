import { getOrCreateCart, getFromCart } from "../models/cart.model.js";
import { createOrder,createOrderItems,clearCart,createOrderAddress } from "../models/checkout.model.js";
import { getSettings } from "../models/settings.model.js";
import { getProductById, reduceStock } from "../models/product.model.js";


export async function checkout (req, res) {
    const userId = req.user.id;
    const shippingData = req.body;
    console.log(shippingData)

    try {

        const cart = await getOrCreateCart(userId);
        const items = await getFromCart(cart.id);
        const shippingRate = (await getSettings()).shipping_rate;

        if (!items.length) {
            return res.status(400).json({ message: "Cart Empty" });
        }

        const subTotal = items.reduce((sum, item) => sum + Number(item.subtotal), 0);
        const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity), 0);

        const shippingCharge = Math.min(750, Math.round(subTotal * shippingRate));
        const total = subTotal + shippingCharge;

        // ✅ STEP 1: CHECK STOCK FIRST
        const failedItems = [];
        

        for (const item of items) {
            const updateProduct = await reduceStock(item.product_id, item.quantity);
            

            if (!updateProduct) {
                const productDetails = await getProductById(item.product_id);
                const quantity= productDetails.stock;
               
                failedItems.push({
                    productId: item.product_id,
                    title: item.title,
                    message: `${quantity >1 && quantity <5 ? "Only "+ quantity :"Sorry! No"} stock available for ${item.title}`
                });
            }
        }


        if (failedItems.length > 0 ) {
            return res.status(400).json({
            message: "Some items have stock issues",
            error: failedItems
            });
        }

        // ✅ STEP 2: ONLY AFTER SUCCESS → CREATE ORDER
        const order = await createOrder(userId, totalQuantity, shippingCharge, subTotal, total, shippingData.paymentMethod, shippingData.paymentStatus, shippingData.paymentId);

        await createOrderItems(order.id, items);
        await createOrderAddress(order.id, shippingData);

        // ✅ STEP 3: CLEAR CART
        await clearCart(cart.id);

        res.json({
            message: "Order placed successfully",
            order
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Checkout failed" });
    }
}