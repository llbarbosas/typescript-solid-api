import { randomBytes } from "crypto";

// import env from '../config/env'
// const { DOMAIN = "express.com", PORT="3000" } = env;
const URL = "localhost:3000";

export class EmailVerification {
  readonly random: string;

  constructor(public readonly userEmail: string) {
    this.random = randomBytes(32).toString("hex");
  }

  getURL() {
    return `http://${URL}/users/verify/${this.random}`;
  }
}
