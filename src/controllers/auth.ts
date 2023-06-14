import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response } from "express";
import { RequestError } from "../templates/errors";
import { AuthUseCase } from "../base/authUseCase";
import { RequestResponse } from "../templates/response";
import { AuthDTO } from "../validations/authDTO";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = AuthDTO.fromLogin(req.body);

    const payload = await AuthUseCase.auth(username, password);
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "24h" });

    return new RequestResponse(200, { accessToken: token }).send(res);
  } catch (error) {
    if (error instanceof RequestError) {
      return error.makeResponse().send(res);
    }
  }
};
