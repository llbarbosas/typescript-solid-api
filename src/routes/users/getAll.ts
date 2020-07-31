import { Repository } from "../../repositories/Repository";
import { User } from "../../entities/User";
import { Request, Response } from "express";

export const getAll = (userRepository: Repository<User>) => async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await userRepository.find();
  return res.send({ users });
};
