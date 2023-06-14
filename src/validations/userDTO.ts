import { z } from "zod";
import { RequestError } from "../templates/errors";
import { CreateUserData } from "../types/createUserData";
import { UpdateUserData } from "../types/updateUserData";

export abstract class UserDTO {
  static fromCreateUser(body: CreateUserData) {
    const schema = z
      .object({
        username: z.string(),
        password: z.string(),
      })
      .strict();

    const validatedData = schema.safeParse(body);
    if (!validatedData.success) {
      throw new RequestError(400, "Invalid body content");
    }

    return body;
  }

  static fromUpdateUser(body: UpdateUserData) {
    const schema = z
      .object({
        username: z.string().optional(),
        password: z.string().optional(),
      })
      .strict();

    const validatedData = schema.safeParse(body);
    if (!validatedData.success) {
      throw new RequestError(400, "Invalid body content");
    }
  }
}
