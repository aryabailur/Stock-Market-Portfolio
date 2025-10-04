import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let authHeader = req.headers.authorization;

    if (Array.isArray(authHeader)) {
      authHeader = authHeader[0];
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided or malformed header",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decodedPayload === "object" && decodedPayload !== null) {
      req.user = decodedPayload as UserPayload;
      next();
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
