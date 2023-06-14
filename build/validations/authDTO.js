"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDTO = void 0;
const zod_1 = require("zod");
const errors_1 = require("../templates/errors");
class AuthDTO {
    static fromLogin(body) {
        const schema = zod_1.z
            .object({
            username: zod_1.z.string(),
            password: zod_1.z.string(),
        })
            .strict();
        const validatedData = schema.safeParse(body);
        if (!validatedData.success) {
            throw new errors_1.RequestError(400, "Invalid body content");
        }
        return body;
    }
}
exports.AuthDTO = AuthDTO;
