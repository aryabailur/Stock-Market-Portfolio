import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
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
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decodedPayload === "object" && decodedPayload !== null) {
            req.user = decodedPayload;
            next();
        }
        else {
            throw new Error("Invalid token payload");
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
