import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from '../models/users.model.js';

export async function registerUser (req, res) {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message: "All field required"})
        };

        const existingUser = await findUserByEmail(email);

        if(existingUser) {
            return res.status(409).json({message: "User already exists"});
        };

        const hasedPassword = await bcrypt.hash(password,10);

        const user = await createUser(name, email, hasedPassword);

        res.status(201).json({
            message: "User registration successfully",
            user
        });

    } catch (err) {
        console.error("Registratioin error", err);
        res.status(500).json({message: "Server Error"});

    };
};