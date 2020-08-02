import { Request, Response, NextFunction } from "express";
import { Repository } from "../repositories/Repository";
import { User } from "../entities/User";

export const verifiedEmail = (userRepository: Repository<User>) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  if (!req.tokenData) res.status(400).send({ message: "Unknown token" });

  const { email } = req.tokenData;
  const user = await userRepository.findOne({ email });

  if (!user) res.status(500).send({ message: "Internal error" });

  if (!user.emailVerified)
    res.status(400).send({ message: "Unverified e-mail" });

  return next();
};
