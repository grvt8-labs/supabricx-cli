import prisma from "../../prismaClient.js";
import bcrypt from "bcryptjs";
import { CreateUserDto } from "../../dtos/user.dto";
import { IUserService } from "../user.services";
import { User } from "@prisma/client";

export class UserServiceImpl implements IUserService {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    return prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
      },
    });
  }
}
