import { db } from "../../config/db.js";
import { CreateUserDto } from "../../dtos/user.dto.js";
import { IUserService } from "../user.service.js";
import { User } from "@prisma/client";
import { hashPassword } from "../../utils/password.utils";

export class UserServiceImpl implements IUserService {
  async getAllUsers(): Promise<User[]> {
    return db.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return db.user.findUnique({ where: { id } });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashed = await hashPassword(dto.password);
    return db.user.create({
      data: {
        email: dto.email,
        password: hashed,
      },
    });
  }

  async updateUser(id: number, data: Partial<CreateUserDto>): Promise<User> {
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    return db.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<void> {
    await db.user.delete({ where: { id } });
  }

  async profile(id: number): Promise<Omit<User, "password"> | null> {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) return null;
    // exclude password before returning
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
