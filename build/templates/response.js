"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResponse = void 0;
class RequestResponse {
    constructor(status, errorOrData, success = true) {
        this.success = success;
        this.status = status;
        this.error = success ? null : errorOrData;
        this.data = success ? errorOrData : null;
    }
    send(res) {
        if (!this.error && !this.data) {
            return res.status(this.status).send();
        }
        return res.status(this.status).send({
            success: this.success,
            error: this.error,
            data: this.data,
        });
    }
}
exports.RequestResponse = RequestResponse;
