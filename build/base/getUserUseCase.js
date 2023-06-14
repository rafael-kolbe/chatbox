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
exports.GetUserUseCase = void 0;
const prismaClient_1 = __importDefault(require("../connection/prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class GetUserUseCase {
    static getAllUsers(include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findMany({
                include: {
                    chats: include.includes("chat"),
                    messages: include.includes("message"),
                },
            });
        });
    }
    static getUserById(id, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findUnique({
                where: {
                    id,
                },
                include: {
                    chats: include.includes("chat"),
                    messages: include.includes("message"),
                },
            });
        });
    }
    static getUserByUsername(username, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findUnique({
                where: {
                    username,
                },
                include: {
                    chats: include.includes("chat"),
                    messages: include.includes("message"),
                },
            });
        });
    }
    static filterUsersByUsername(username, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findMany({
                where: {
                    username: {
                        contains: username,
                    },
                },
                include: {
                    chats: include.includes("chat"),
                    messages: include.includes("message"),
                },
            });
        });
    }
    static getMe(authorization, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = authorization.split(" ")[1];
            const validToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return (yield prismaClient_1.default.user.findUnique({
                where: {
                    id: validToken.id,
                },
                include: {
                    chats: include.includes("chat"),
                    messages: include.includes("message"),
                },
            }));
        });
    }
}
exports.GetUserUseCase = GetUserUseCase;
