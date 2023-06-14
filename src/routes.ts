import express, { Express } from "express";
import { isHealthy } from "./controllers/health";
import { createUser, getAllUsers, getUserById, updateUser } from "./controllers/user";
import { login } from "./controllers/auth";
import { isAuth } from "./middlewares/isAuth";

export const route: Express = express();

route.get("/", isHealthy);

route.post("/auth/login", login);
route.post("/users", createUser);

route.use(isAuth);

route.get("/users", getAllUsers);
route.get("/users/:id", getUserById);
route.put("/users", updateUser);
