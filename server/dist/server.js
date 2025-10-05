import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import portfolioRouter from "./routes/portfolioRoutes.js";
import stockRouter from "./routes/stockRoutes.js";
const app = express();
const port = 5000;
// --- MIDDLEWARE ---
app.use(cors()); // <-- 2. Use cors middleware BEFORE your routes
app.use(express.json());
// --- ROUTES ---
app.use("/api/auth", authRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/stocks", stockRouter);
app.listen(port, () => {
    console.log(`listening to port: ${port}`);
});
