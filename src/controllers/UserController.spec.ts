import { FakeUserRepository } from "../repositories/UserRepository";
import { FakeEmailVerificationRepository } from "../repositories/EmailVerificationRepository";
import { Request, Response } from "express";
import { MailProvider } from "../providers/MailProvider";
import { UserController } from "./UserController";

describe("UserController test", () => {
  const userRepository = new FakeUserRepository();
  const mailProvider = new MailProvider();
  const emailVerificationRepository = new FakeEmailVerificationRepository();
  const userController = new UserController(
    userRepository,
    emailVerificationRepository,
    mailProvider
  );

  it("create", async () => {
    const req: Request = {} as Request;
    const res: Response = {} as Response;

    req.body = { name: "Test", email: "test@example.com", password: "1234" };

    res.status = jest.fn(() => res);
    res.send = jest.fn();

    await userController.create(req, res);

    expect(res.status).toBeCalledWith(201);
    expect(res.send).toBeCalled();
    expect((await userRepository.findAll()).length).toBe(1);
  });

  it("getAll", async () => {
    const req: Request = {} as Request;
    const res: Response = {} as Response;

    res.send = jest.fn();

    await userController.getAll(req, res);

    expect(res.send).toBeCalled();
  });
});
