import prisma from "../connection/prismaClient";
import bcrypt from "bcrypt";
import { CreateUserData } from "../types/createUserData";

export abstract class CreateUserUseCase {
  static async createUser(data: CreateUserData) {
    const { username, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }
}
