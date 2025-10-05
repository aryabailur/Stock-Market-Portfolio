import { createUser, findUserByEmail } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function register(req, res) {
    try {
        const { email, password, username } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const user = await findUserByEmail(email);
        if (user) {
            return res.status(409).json({
                message: "Already registered,sign in",
            });
        }
        else {
            const password_hash = await bcrypt.hash(req.body.password, 10);
            const newUser = await createUser({
                email,
                password_hash,
                username: username || email.split("@")[0],
            });
            const payload = {
                id: newUser.id,
                email: newUser.email,
            };
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
            res.status(201).json({ token });
        }
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "error in registration" });
    }
}
export async function login(req, res) {
    console.log("==================");
    console.log("LOGIN FUNCTION CALLED");
    console.log("==================");
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log("📧 Email:", email);
        if (!email || !password) {
            return res.status(401).json({ message: "missing email or password" });
        }
        const user = await findUserByEmail(email);
        console.log("👤 User found:", user);
        console.log("👤 User ID:", user?.id);
        if (!user) {
            return res.status(401).json({ message: "invalid email or password" });
        }
        if (await bcrypt.compare(password, user.password_hash)) {
            const payload = {
                id: user.id,
            };
            console.log("📦 Payload being signed:", payload);
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
            console.log("✅ Token created successfully");
            res.status(200).json({ message: "login successfull", token });
        }
        else {
            res.status(401).json({ message: "invalid email or password" });
        }
    }
    catch (error) {
        console.log("login error", error);
        res.status(500).json({ error });
    }
}
