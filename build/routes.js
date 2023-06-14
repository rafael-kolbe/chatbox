"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const health_1 = require("./controllers/health");
const user_1 = require("./controllers/user");
const auth_1 = require("./controllers/auth");
const isAuth_1 = require("./middlewares/isAuth");
exports.route = (0, express_1.default)();
exports.route.get("/", health_1.isHealthy);
exports.route.post("/auth/login", auth_1.login);
exports.route.post("/users", user_1.createUser);
exports.route.use(isAuth_1.isAuth);
exports.route.get("/users", user_1.getAllUsers);
exports.route.get("/users/:id", user_1.getUserById);
exports.route.put("/users", user_1.updateUser);
