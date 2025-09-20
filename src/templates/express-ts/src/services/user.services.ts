import { CreateUserDto } from "../dtos/user.dto.js";
import { User } from "@prisma/client";

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  createUser(dto: CreateUserDto): Promise<User>;
}
