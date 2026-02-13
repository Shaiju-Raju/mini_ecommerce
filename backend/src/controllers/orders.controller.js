import { 
    getOrdersByUser, 
    getOrderById,
    getOrderItems,
    getAllOrdersModel,
    updateOrderStatusModel } from "../models/orders.model.js";


export async function getUserOrders (req, res) {
    const userId = req.user.id;

    try {
        const orders = await getOrdersByUser(userId);
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
        console.log(err)
    }
};

export async function getSingleOrder(req, res) {
    const {id} = req.params;
    const userId = req.user.id;

    try {
      const order = await getOrderById(id);

      if (!order) {
        return res.status(400).json({message: "Order not found"});
      }

      if (order.user_id !== userId && req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
       }

       const items = await getOrderItems(id);

       res.json({order, items});

    } catch (err) {
        res.status(500).json({error: "Failed to fetch order"});

    }
}

export async function getAllOrders(req, res) {
    try {
        const orders = await getAllOrdersModel();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch all orders" });
    }
}

export async function updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updated = await updateOrderStatusModel(id, status);

        res.json({
            message: "Order status updated",
            order: updated
        });

    } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
    }
}
