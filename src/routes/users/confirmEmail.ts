import { Repository } from "../../repositories/Repository";
import { User } from "../../entities/User";
import { EmailVerification } from "../../entities/EmailVerification";
import { Request, Response } from "express";

export const confirmEmail = (
  userRepository: Repository<User>,
  emailVerificationRepository: Repository<EmailVerification>
) => async (req: Request, res: Response): Promise<Response> => {
  const { random } = req.params;

  const verification = await emailVerificationRepository.findOne({
    random,
  });

  if (!verification) return res.status(400).send({ message: "Unknown code" });

  const user = await userRepository.findOne({
    email: verification.userEmail,
  });

  if (!user) return res.status(400).send({ message: "Unknown error" });

  user.emailVerified = true;

  await userRepository.update({ id: user.id }, user);
  await emailVerificationRepository.delete({ random });

  return res.status(200).send({ message: "E-mail verified" });
};
