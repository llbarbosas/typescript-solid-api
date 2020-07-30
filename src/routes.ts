import { UserController } from "./controllers/UserController";
import { FakeUserRepository } from "./repositories/UserRepository";
import { MailProvider } from "./providers/MailProvider";
import { Router } from "express";

const userRepository = new FakeUserRepository();
const mailProvider = new MailProvider();
const userController = new UserController(userRepository, mailProvider);

const router = Router();

const bind = (obj: any, func: keyof typeof obj) => obj[func].bind(obj);

router.get("/users", bind(userController, "getAll"));
router.post("/users", bind(userController, "create"));

export { router };
