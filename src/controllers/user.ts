import { Request, Response } from "express";
import { RequestError } from "../templates/errors";
import { RequestResponse } from "../templates/response";
import { GetUserUseCase } from "../base/getUserUseCase";
import { CreateUserUseCase } from "../base/createUserUseCase";
import { UpdateUserUseCase } from "../base/updateUserUseCase";
import { UserDTO } from "../validations/userDTO";

export const getAllUsers = async (req: Request, res: Response) => {
  const { n: username } = req.query;

  try {
    if (typeof username === "string") {
      const filteredUsers = await GetUserUseCase.filterUsersByUsername(username, ["chat", "message"]);

      if (!filteredUsers) {
        throw new RequestError(404, "User not found");
      }

      const returnData = filteredUsers.map(({ password, ...user }) => user);

      return new RequestResponse(200, returnData).send(res);
    }

    const allUsers = await GetUserUseCase.getAllUsers(["chat"]);

    if (!allUsers) {
      throw new RequestError(500, "Internal Server Error");
    }

    const returnData = allUsers.map(({ password, ...user }) => user);

    return new RequestResponse(200, returnData).send(res);
  } catch (error) {
    if (error instanceof RequestError) {
      return error.makeResponse().send(res);
    }
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await GetUserUseCase.getUserById(id, ["chat", "message"]);

    if (!user) {
      throw new RequestError(404, "User not found");
    }

    const { password, ...returnData } = user;

    return new RequestResponse(200, returnData).send(res);
  } catch (error) {
    if (error instanceof RequestError) {
      return error.makeResponse().send(res);
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username } = UserDTO.fromCreateUser(req.body);

    const userExists = await GetUserUseCase.getUserByUsername(username);

    if (userExists) {
      throw new RequestError(400, "User already exists");
    }

    const newUser = await CreateUserUseCase.createUser(req.body);

    if (!newUser) {
      throw new RequestError(400, "Failed to create user");
    }

    const { password, ...returnData } = newUser;

    return new RequestResponse(201, returnData).send(res);
  } catch (error) {
    if (error instanceof RequestError) {
      return error.makeResponse().send(res);
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  try {
    UserDTO.fromUpdateUser(req.body);

    const user = await GetUserUseCase.getMe(authorization as string);

    await UpdateUserUseCase.updateUser(user, req.body);

    return new RequestResponse(204).send(res);
  } catch (error) {
    if (error instanceof RequestError) {
      return error.makeResponse().send(res);
    }
  }
};
