import { User } from "@prisma/client";
import prisma from "../connection/prismaClient";
import { RequestError } from "../templates/errors";
import { GetUserUseCase } from "./getUserUseCase";
import { UpdateUserData } from "../types/updateUserData";

export abstract class UpdateUserUseCase {
  static async updateUser(user: User, data: UpdateUserData): Promise<void> {
    const { username } = data;

    if (username) {
      const userExists = await GetUserUseCase.getUserByUsername(username);

      if (userExists) {
        throw new RequestError(400, "Username already exists");
      }
    }

    await prisma.user.update({
      data,
      where: {
        id: user.id,
      },
    });
  }
}
