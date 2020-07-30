import { IRepository, FakeRepository } from "./IRepository";
import { User } from "../entities/User";

export class FakeUserRepository extends FakeRepository<User>
  implements IRepository<User> {}
