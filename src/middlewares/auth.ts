import { Role } from "../entities/User";
import { AuthTokenData } from "../entities/AuthToken";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import env from "../config/env";

const { SECRET } = env;

export const auth = (...roles: Role[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
  const [, token] = authHeader.split(" ");

  if (!SECRET) return res.status(500).json({ message: "Internal error" });

  try {
    const tokenData = (await promisify(jwt.verify)(
      token,
      SECRET
    )) as AuthTokenData;

    if (!roles.includes(tokenData.role))
      return res.status(400).send({ message: "Unauthorized request" });

    req.tokenData = tokenData;

    return next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
