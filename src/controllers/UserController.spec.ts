import { FakeUserRepository } from "../repositories/UserRepository"
import { Request, Response } from "express";
import { MailProvider } from "../providers/MailProvider";
import { UserController } from "./UserController";

describe('UserController test', () => {
    const userRespository = new FakeUserRepository();
    const mailProvider = new MailProvider();
    const userController = new UserController(userRespository, mailProvider);

    it('getAll', async () => {
        const req: Request = {} as Request;
        const res: Response = {} as Response;

        res.send = jest.fn();

        await userController.getAll(req, res);

        expect(res.send).toBeCalled();
    });
});