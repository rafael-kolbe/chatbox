import { Response } from "express";

type ErrorOrData = string | object | object[] | null;

export class RequestResponse {
  status: number;
  success: boolean;
  error: string | null;
  data: object | object[] | null;

  constructor(status: number, errorOrData?: ErrorOrData, success: boolean = true) {
    this.success = success;
    this.status = status;
    this.error = success ? null : (errorOrData as string | null);
    this.data = success ? (errorOrData as object | object[]) : null;
  }

  send(res: Response) {
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
