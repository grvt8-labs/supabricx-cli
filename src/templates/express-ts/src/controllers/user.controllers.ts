import { Request, Response } from "express";
import { UserServiceImpl } from "../services/impl/user.service.impl";
import { CreateUserDto } from "../dtos/user.dto";

const userService = new UserServiceImpl();

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const user = await userService.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const dto: CreateUserDto = req.body;
  const newUser = await userService.createUser(dto);
  res.status(201).json(newUser);
}

export async function updateUser(req: Request, res: Response) {
  const updated = await userService.updateUser(Number(req.params.id), req.body);
  res.json(updated);
}

export async function deleteUser(req: Request, res: Response) {
  await userService.deleteUser(Number(req.params.id));
  res.status(204).send();
}

export async function profile(req: Request, res: Response) {
  const profile = await userService.profile(Number(req.params.id));
  if (!profile) return res.status(404).json({ message: "User not found" });
  res.json(profile);
}
