import prisma from "../prismaClient.js";
import { CreateUserDto } from "../dtos/user.dto.js";
import bcrypt from "bcryptjs";

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(dto: CreateUserDto) {
  const hashed = await bcrypt.hash(dto.password, 10);
  return prisma.user.create({
    data: {
      email: dto.email,
      password: hashed,
    },
  });
}
