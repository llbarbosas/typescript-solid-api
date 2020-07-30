import { IRepository } from "../repositories/IRepository";
import { IMailProvider } from "../providers/MailProvider";
import { User } from "../entities/User";
import { EmailVerification } from "../entities/EmailVerification";
import { Request, Response } from "express";

export class UserController {
  constructor(
    private userRepository: IRepository<User>,
    private emailVerificationRepository: IRepository<EmailVerification>,
    private mailProvider: IMailProvider
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const users = await this.userRepository.findAll();
    return res.send({ users });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;

    const anotherUser = await this.userRepository.findBy("email", email);

    if (anotherUser)
      return res.status(400).send({ message: "Este e-mail já foi cadastrado" });

    const user = new User({ email, password, name });

    await this.userRepository.save(user);

    const verification = new EmailVerification(user.email);
    await this.emailVerificationRepository.save(verification);

    const confirmationLinkMessage = {
      to: { name, email },
      from: { name: "SOLID App", email: "suport@solid.com" },
      subject: "Confirm your e-mail",
      body: `<p>You can confirm your email on <a href="${verification.getURL()}">this link</a></p>`,
    };

    try {
      await this.mailProvider.sendMail(confirmationLinkMessage);
    } catch (err) {
      return res.status(500).send({ message: err });
    }

    return res.status(201).send({ user });
  }

  async confirmMail(req: Request, res: Response): Promise<Response> {
    const { random } = req.params;

    const verification = await this.emailVerificationRepository.findBy(
      "random",
      random
    );

    if (!verification) return res.status(400).send({ message: "Unknown code" });

    const user = await this.userRepository.findBy(
      "email",
      verification.userEmail
    );

    if (!user) return res.status(400).send({ message: "Unknown error" });

    user.emailVerified = true;

    await this.userRepository.update("id", user.id, user);

    return res.status(200).send({ message: "E-mail verified" });
  }
}
