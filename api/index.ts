import "dotenv/config";
import express from "express";

const app: express.Application = express();
const port = process.env.PORT;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
