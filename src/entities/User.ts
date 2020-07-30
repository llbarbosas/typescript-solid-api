import { uuid } from "uuidv4";
import bcrypt from "bcrypt";

const { DOMAIN = "express.com", SECRET = "secret" } = process.env;

export enum Role {
  Admin,
  User,
}

export class User {
  readonly id: string;
  name: string;
  email: string;
  role: Role;
  password: string;

  constructor(
    data: { name: string; email: string; password: string },
    created?: { password: string; id: string }
  ) {
    this.id = created?.id || uuid();
    this.name = data.name;
    this.email = data.email;
    this.role = new RegExp(`@${DOMAIN}$`).test(data.email)
      ? Role.Admin
      : Role.User;
    this.password = created?.password || bcrypt.hashSync(data.password, SECRET);
  }

  comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
