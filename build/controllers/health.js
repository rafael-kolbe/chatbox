"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHealthy = void 0;
const response_1 = require("../templates/response");
const isHealthy = (_, res) => {
    return new response_1.RequestResponse(200, { healthy: true }).send(res);
};
exports.isHealthy = isHealthy;
