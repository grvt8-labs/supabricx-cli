import { Request, Response } from "express";
import * as UserService from "../services/user.services";
import { CreateUserDto } from "../dtos/user.dto";

export async function getUsers(req: Request, res: Response) {
  const users = await UserService.getAllUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const user = await UserService.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const dto: CreateUserDto = req.body;
  const newUser = await UserService.createUser(dto);
  res.status(201).json(newUser);
}
