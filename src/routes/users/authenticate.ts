import { Repository } from "../../repositories/Repository";
import { User } from "../../entities/User";
import { AuthToken } from "../../entities/AuthToken";
import { Request, Response } from "express";

export const authenticate = (userRepository: Repository<User>) => async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({ email });

  if (!user) return res.status(400).send({ message: "Unknown credentials" });

  const result = user.comparePassword(password);

  if (!result) return res.status(400).send({ message: "Unknown credentials" });

  try {
    const token = new AuthToken(user);

    return res.status(200).send({ token: token.value });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
