import bcrypt from "bcrypt";
import { RequestError } from "../templates/errors";
import { TokenPayload } from "../types/tokenPayload";
import { GetUserUseCase } from "./getUserUseCase";

export abstract class AuthUseCase {
  static async auth(username: string, password: string): Promise<TokenPayload> {
    const user = await GetUserUseCase.getUserByUsername(username);

    if (!user) {
      throw new RequestError(401, "Username or password invalid");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new RequestError(401, "Username or password invalid");
    }

    return {
      id: user.id,
      username,
      createdAt: user.createdAt,
    };
  }
}
