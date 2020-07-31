import { UserController } from "./controllers/UserController";
import { FakeUserRepository } from "./repositories/UserRepository";
import { FakeEmailVerificationRepository } from "./repositories/EmailVerificationRepository";
import { MailProvider } from "./providers/MailProvider";
import { Router } from "express";

const userRepository = new FakeUserRepository();
const mailProvider = new MailProvider();
const emailVerificationRepository = new FakeEmailVerificationRepository();
const userController = new UserController(
  userRepository,
  emailVerificationRepository,
  mailProvider
);

const router = Router();

const bind = (obj: any, func: keyof typeof obj) => obj[func].bind(obj);

router.get("/users", bind(userController, "getAll"));
router.post("/users", bind(userController, "create"));
router.get("/users/verify/:random", bind(userController, "confirmMail"));
router.post("/authenticate", bind(userController, "authenticate"));

export { router };
