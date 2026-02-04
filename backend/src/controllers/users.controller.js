import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
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
            user: {
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.error("Registratioin error", err);
        res.status(500).json({message: "Server Error"});

    };
};


export async function loginUser (req, res)  {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "Email and Password required"});
        };

        const user = await findUserByEmail(email);

        if(!user) {
            return res.status(401).json({message: "Invalid credential"});
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid Credential"});
        };


        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );

        res.json({
            message:"Login Successfully",
            token
        });

    } catch (err) {
        console.error("Loggin Error",err);
        res.status(500).json({message: "Server Error"});
    }
};