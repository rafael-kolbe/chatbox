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
exports.UpdateUserUseCase = void 0;
const prismaClient_1 = __importDefault(require("../connection/prismaClient"));
const errors_1 = require("../templates/errors");
const getUserUseCase_1 = require("./getUserUseCase");
class UpdateUserUseCase {
    static updateUser(user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = data;
            if (username) {
                const userExists = yield getUserUseCase_1.GetUserUseCase.getUserByUsername(username);
                if (userExists) {
                    throw new errors_1.RequestError(400, "Username already exists");
                }
            }
            yield prismaClient_1.default.user.update({
                data,
                where: {
                    id: user.id,
                },
            });
        });
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
