"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RequestError_status;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
const response_1 = require("./response");
class RequestError extends Error {
    constructor(status, message) {
        super(message);
        _RequestError_status.set(this, void 0);
        __classPrivateFieldSet(this, _RequestError_status, status, "f");
    }
    makeResponse() {
        return new response_1.RequestResponse(__classPrivateFieldGet(this, _RequestError_status, "f"), this.message, false);
    }
}
exports.RequestError = RequestError;
_RequestError_status = new WeakMap();
