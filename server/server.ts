import express from "express";
import authRouter from "./routes/authRouter.js";
import portfolioRouter from "./routes/portfolioRoutes.js";
import stockRouter from "./routes/stockRoutes.js";

const app = express();
const port = 5000;

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/stocks", stockRouter);

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
