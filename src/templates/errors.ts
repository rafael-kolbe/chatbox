import { RequestResponse } from "./response";

export class RequestError extends Error {
  #status: number;

  constructor(status: number, message: string) {
    super(message);
    this.#status = status;
  }

  makeResponse() {
    return new RequestResponse(this.#status, this.message, false);
  }
}
