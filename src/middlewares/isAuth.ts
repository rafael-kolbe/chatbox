import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { RequestError } from "../templates/errors";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new RequestError(401, "Unauthorized");
    }

    const token = authorization.split(" ")[1];
    const validToken = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!validToken) {
      throw new RequestError(401, "Unauthorized");
    }

    return next();
  } catch (error) {
    if (error instanceof RequestError) {
      return error.makeResponse().send(res);
    }
  }
};
