import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function checkBearer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const head = req.headers["Authorization"];
    if (!head) {
      return res.status(401).json({ message: "Unauthorized error" });
    }
    const isBearer = head.startsWith("Bearer");
    if (!isBearer) {
      return res.status(401).json({ message: "Unauthorized error" });
    } else {
      const authorizationArray = head.split(" ");
      const token = authorizationArray[1];
      const secretKey = process.env.JWT_SECRET as string;
      try {
        const decodedPayload = jwt.verify(token, secretKey);
        req.user = decodedPayload;
        next();
      } catch (Error) {
        console.log("error in jwt verification", Error);
        throw Error;
      }
    }
  } catch (Error) {
    console.log("error", Error);
    res.status(401).json({ message: "error in middleware" });
  }
}
