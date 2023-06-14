import prisma from "../connection/prismaClient";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { TokenPayload } from "../types/tokenPayload";
import { User } from "@prisma/client";

export abstract class GetUserUseCase {
  static async getAllUsers(include: string[] = []) {
    return await prisma.user.findMany({
      include: {
        chats: include.includes("chat"),
        messages: include.includes("message"),
      },
    });
  }

  static async getUserById(id: string, include: string[] = []) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        chats: include.includes("chat"),
        messages: include.includes("message"),
      },
    });
  }

  static async getUserByUsername(username: string, include: string[] = []) {
    return await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        chats: include.includes("chat"),
        messages: include.includes("message"),
      },
    });
  }

  static async filterUsersByUsername(username: string, include: string[] = []) {
    return await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      include: {
        chats: include.includes("chat"),
        messages: include.includes("message"),
      },
    });
  }

  static async getMe(authorization: string, include: string[] = []): Promise<User> {
    const token = authorization.split(" ")[1];
    const validToken = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    return (await prisma.user.findUnique({
      where: {
        id: validToken.id,
      },
      include: {
        chats: include.includes("chat"),
        messages: include.includes("message"),
      },
    })) as User;
  }
}
