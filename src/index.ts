import express, { Express } from "express";
import "dotenv/config";
import { route } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(route);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on Port ${process.env.SERVER_PORT}`);
});
