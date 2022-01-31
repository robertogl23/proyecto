import "dotenv/config";
import express from "express";
import userRouter from "./routes/UserRoutes";
import morgan from "morgan";

const app: express.Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('tiny'));
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
