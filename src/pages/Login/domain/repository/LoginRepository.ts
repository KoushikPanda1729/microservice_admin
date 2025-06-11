import type { LoginEntity } from "../entities/LoginEntity";

export interface LoginRepository {
  loginUser(gmail: string, password: string): Promise<LoginEntity>;
}
