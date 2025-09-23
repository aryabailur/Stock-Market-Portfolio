import express from "express";
import router from "./routes/authRouter";

const app = express();
const port = 5000;

// This line is needed to parse JSON request bodies
app.use(express.json());
app.use("/api/auth", router);

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
