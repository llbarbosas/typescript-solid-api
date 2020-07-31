import { Repository } from "../../repositories/Repository";
import { MailProvider } from "../../providers/MailProvider";
import { User } from "../../entities/User";
import { EmailVerification } from "../../entities/EmailVerification";
import { Request, Response } from "express";

export const create = (
  userRepository: Repository<User>,
  emailVerificationRepository: Repository<EmailVerification>,
  mailProvider: MailProvider
) => async (req: Request, res: Response): Promise<Response> => {
  const { email, password, name } = req.body;

  const anotherUser = await userRepository.findOne({ email });

  if (anotherUser)
    return res.status(400).send({ message: "Este e-mail já foi cadastrado" });

  const user = new User({ email, password, name });

  await userRepository.save(user);

  const verification = new EmailVerification(user.email);
  await emailVerificationRepository.save(verification);

  const confirmationLinkMessage = {
    to: { name, email },
    from: { name: "SOLID App", email: "suport@solid.com" },
    subject: "Confirm your e-mail",
    body: `<p>You can confirm your email on <a href="${verification.getURL()}">this link</a></p>`,
  };

  try {
    await mailProvider.sendMail(confirmationLinkMessage);
  } catch (err) {
    return res.status(500).send({ message: err });
  }

  return res.status(201).send({ user });
};
