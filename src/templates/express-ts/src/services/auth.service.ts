import { User } from "@prisma/client";

export interface IAuthService {
  register(email: string, password: string, role?: string): Promise<User>;
  login(email: string, password: string): Promise<{ user: User; token: string }>;
}
