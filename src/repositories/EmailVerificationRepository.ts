import { IRepository, FakeRepository } from "./IRepository";
import { EmailVerification } from "../entities/EmailVerification";

export class FakeEmailVerificationRepository
  extends FakeRepository<EmailVerification>
  implements IRepository<EmailVerification> {}
