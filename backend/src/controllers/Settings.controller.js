import { getSettings } from "../models/settings.model.js";

export async function getShippingRate (req, res) {
    try {
    const settings = await getSettings();
    res.json(settings);
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    };
};