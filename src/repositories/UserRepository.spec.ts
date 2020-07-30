import { FakeUserRepository } from "./UserRepository"
import { User } from "../entities/User";

describe('UserRepository test', () => {
    const userRespository = new FakeUserRepository();
    const testUser = new User({ name: 'Test', password: '1234', email: 'test@example.com' });

    it('must save a user', async () => {
        userRespository.save(testUser);
        expect(await userRespository.findBy('id', testUser.id));
    })

    it('must get all users', async () => {
        expect(await userRespository.findAll());
    })
})