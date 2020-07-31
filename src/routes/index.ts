import { router as usersModule } from "./users";
import { Router } from "express";

const router = Router();

router.use("/users", usersModule);

export { router };
