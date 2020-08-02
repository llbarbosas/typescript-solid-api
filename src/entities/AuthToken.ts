import { User, Role } from "./User";
import jwt from "jsonwebtoken";
import env from "../config/env";

export interface AuthTokenData {
  email: string;
  role: Role;
}

const { SECRET } = env;

export class AuthToken {
  readonly value: string;

  constructor(user: User) {
    if (!SECRET) throw new Error("Internal error");

    this.value = jwt.sign({ email: user.email, role: user.role }, SECRET, {
      expiresIn: "12h",
    });
  }

  static verify(token: string) {
    if (!SECRET) throw new Error("Internal error");

    return jwt.verify(token, SECRET);
  }

  verify() {
    return AuthToken.verify(this.value);
  }
}
