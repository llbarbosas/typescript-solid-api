import { Router } from "express";
import { MockRepository } from "../../repositories/MockRepository";
import { NodemailerMailProvider } from "../../providers/NodemailerMailProvider";
import { User } from "../../entities/User";
import { EmailVerification } from "../../entities/EmailVerification";

import { getAll } from "./getAll";
import { create } from "./create";
import { confirmEmail } from "./confirmEmail";
import { authenticate } from "./authenticate";

const userRepository = new MockRepository<User>();
const emailVerificationRepository = new MockRepository<EmailVerification>();
const mailProvider = new NodemailerMailProvider();

const router = Router();

router.get("/", getAll(userRepository));
router.post(
  "/",
  create(userRepository, emailVerificationRepository, mailProvider)
);
router.get(
  "/verify/:random",
  confirmEmail(userRepository, emailVerificationRepository)
);
router.post("/authenticate", authenticate(userRepository));

export { router };
