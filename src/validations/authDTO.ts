import { z } from "zod";
import { RequestError } from "../templates/errors";
import { AuthData } from "../types/authData";

export abstract class AuthDTO {
  static fromLogin(body: AuthData) {
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
}
