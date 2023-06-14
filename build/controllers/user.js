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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const errors_1 = require("../templates/errors");
const response_1 = require("../templates/response");
const getUserUseCase_1 = require("../base/getUserUseCase");
const createUserUseCase_1 = require("../base/createUserUseCase");
const updateUserUseCase_1 = require("../base/updateUserUseCase");
const userDTO_1 = require("../validations/userDTO");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { n: username } = req.query;
    try {
        if (typeof username === "string") {
            const filteredUsers = yield getUserUseCase_1.GetUserUseCase.filterUsersByUsername(username, ["chat", "message"]);
            if (!filteredUsers) {
                throw new errors_1.RequestError(404, "User not found");
            }
            const returnData = filteredUsers.map((_a) => {
                var { password } = _a, user = __rest(_a, ["password"]);
                return user;
            });
            return new response_1.RequestResponse(200, returnData).send(res);
        }
        const allUsers = yield getUserUseCase_1.GetUserUseCase.getAllUsers(["chat"]);
        if (!allUsers) {
            throw new errors_1.RequestError(500, "Internal Server Error");
        }
        const returnData = allUsers.map((_a) => {
            var { password } = _a, user = __rest(_a, ["password"]);
            return user;
        });
        return new response_1.RequestResponse(200, returnData).send(res);
    }
    catch (error) {
        if (error instanceof errors_1.RequestError) {
            return error.makeResponse().send(res);
        }
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield getUserUseCase_1.GetUserUseCase.getUserById(id, ["chat", "message"]);
        if (!user) {
            throw new errors_1.RequestError(404, "User not found");
        }
        const { password } = user, returnData = __rest(user, ["password"]);
        return new response_1.RequestResponse(200, returnData).send(res);
    }
    catch (error) {
        if (error instanceof errors_1.RequestError) {
            return error.makeResponse().send(res);
        }
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = userDTO_1.UserDTO.fromCreateUser(req.body);
        const userExists = yield getUserUseCase_1.GetUserUseCase.getUserByUsername(username);
        if (userExists) {
            throw new errors_1.RequestError(400, "User already exists");
        }
        const newUser = yield createUserUseCase_1.CreateUserUseCase.createUser(req.body);
        if (!newUser) {
            throw new errors_1.RequestError(400, "Failed to create user");
        }
        const { password } = newUser, returnData = __rest(newUser, ["password"]);
        return new response_1.RequestResponse(201, returnData).send(res);
    }
    catch (error) {
        if (error instanceof errors_1.RequestError) {
            return error.makeResponse().send(res);
        }
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    try {
        userDTO_1.UserDTO.fromUpdateUser(req.body);
        const user = yield getUserUseCase_1.GetUserUseCase.getMe(authorization);
        yield updateUserUseCase_1.UpdateUserUseCase.updateUser(user, req.body);
        return new response_1.RequestResponse(204).send(res);
    }
    catch (error) {
        if (error instanceof errors_1.RequestError) {
            return error.makeResponse().send(res);
        }
    }
});
exports.updateUser = updateUser;
