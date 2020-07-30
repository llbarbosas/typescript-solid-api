import { IRepository } from "../repositories/IRepository";
import { IMailProvider } from "../providers/MailProvider";
import { User } from "../entities/User";
import { Request, Response } from "express";

export class UserController {
  constructor(
    private userRepository: IRepository<User>,
    private mailProvider: IMailProvider
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const users = await this.userRepository.findAll();
    return res.send({ users });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });

    // this.mailProvider.send(confirmationMail)

    return res.status(201).send({ user });
  }
}
