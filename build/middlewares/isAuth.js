"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const errors_1 = require("../templates/errors");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            throw new errors_1.RequestError(401, "Unauthorized");
        }
        const token = authorization.split(" ")[1];
        const validToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!validToken) {
            throw new errors_1.RequestError(401, "Unauthorized");
        }
        return next();
    }
    catch (error) {
        if (error instanceof errors_1.RequestError) {
            return error.makeResponse().send(res);
        }
    }
});
exports.isAuth = isAuth;
