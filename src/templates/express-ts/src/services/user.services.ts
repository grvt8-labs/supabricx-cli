import { CreateUserDto } from "../dtos/user.dto.js";
import { User } from "@prisma/client";


export interface UserService {
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  createUser(dto: CreateUserDto): Promise<User>;
  updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User>;
  deleteUser(id: number): Promise<void>;
  profile(id: number): Promise<Omit<User, "password">>
}
