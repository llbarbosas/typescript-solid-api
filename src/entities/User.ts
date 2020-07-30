import { uuid } from "uuidv4";
import bcrypt from "bcrypt";
import env from "../config/env";

const { DOMAIN } = env;

export enum Role {
  Admin,
  User,
}

export class User {
  readonly id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  password: string;

  constructor(
    data: { name: string; email: string; password: string },
    created?: { password: string; id: string; emailVerified: boolean }
  ) {
    this.name = data.name;
    this.email = data.email;
    this.id = created?.id || uuid();
    this.emailVerified = created?.emailVerified || false;
    this.role = new RegExp(`@${DOMAIN}$`).test(data.email)
      ? Role.Admin
      : Role.User;
    this.password = created?.password || bcrypt.hashSync(data.password, 2);
  }

  comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
