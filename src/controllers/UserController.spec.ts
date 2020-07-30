import { FakeUserRepository } from "../repositories/UserRepository"
import { Request, Response } from "express";
import { MailProvider } from "../providers/MailProvider";
import { UserController } from "./UserController";

describe('UserController test', () => {
    const userRespository = new FakeUserRepository();
    const mailProvider = new MailProvider();
    const userController = new UserController(userRespository, mailProvider);

    it('create', async () => {
        const req: Request = {} as Request;
        const res: Response = {} as Response;

        req.body = { name: 'Test', email: 'test@example.com', password: '1234' };

        res.status = jest.fn(() => res);
        res.send = jest.fn();

        await userController.create(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(res.send).toBeCalled();
        expect((await userRespository.findAll()).length).toBe(1)
    });

    it('getAll', async () => {
        const req: Request = {} as Request;
        const res: Response = {} as Response;

        res.send = jest.fn();

        await userController.getAll(req, res);

        expect(res.send).toBeCalled();
    });
});