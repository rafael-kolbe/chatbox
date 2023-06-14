import { Response } from "express";
import { RequestResponse } from "../templates/response";

export const isHealthy = (_: unknown, res: Response) => {
  return new RequestResponse(200, { healthy: true }).send(res);
};
