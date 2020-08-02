import { AuthTokenData } from "../src/entities/AuthToken";

declare namespace Express {
  export interface Request {
    tokenData?: AuthTokenData;
  }
}
