import { createUser, findUserByEmail } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  console.log("==================");
  console.log("REGISTER FUNCTION CALLED");
  console.log("==================");

  try {
    const { email, password, username } = req.body;

    console.log("📧 Email:", email);
    console.log("👤 Username:", username);

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(409).json({
        message: "Already registered, sign in",
      });
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const password_hash = await bcrypt.hash(password, 10);

    // Create new user
    console.log("👤 Creating new user...");
    const newUser = await createUser({
      email,
      password_hash,
      username: username || email.split("@")[0],
    });

    console.log("✅ User created successfully, ID:", newUser.id);

    // Generate JWT token
    const payload = {
      id: newUser.id,
      email: newUser.email,
    };

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      console.error("❌ JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });

    console.log("✅ Token generated successfully");

    res.status(201).json({
      message: "Registration successful",
      token,
    });
  } catch (error) {
    console.error("❌ REGISTRATION ERROR:");
    console.error(error);

    res.status(500).json({
      message: "Server error during registration",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function login(req: Request, res: Response) {
  console.log("==================");
  console.log("LOGIN FUNCTION CALLED");
  console.log("==================");

  try {
    const { email, password } = req.body;

    console.log("📧 Email:", email);

    // Validate required fields
    if (!email || !password) {
      console.log("⚠️ Missing email or password");
      return res.status(401).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    console.log("🔍 Looking up user...");
    const user = await findUserByEmail(email);

    if (!user) {
      console.log("⚠️ User not found");
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("👤 User found, ID:", user.id);

    // Verify password
    console.log("🔐 Verifying password...");
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      console.log("⚠️ Invalid password");
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("✅ Password verified");

    // Generate JWT token
    const payload = {
      id: user.id,
    };

    console.log("📦 Payload being signed:", payload);

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      console.error("❌ JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });

    console.log("✅ Token created successfully");

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:");
    console.error(error);

    res.status(500).json({
      message: "Server error during login",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
