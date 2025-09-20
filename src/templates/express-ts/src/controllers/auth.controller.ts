import { Request, Response } from "express";
import { AuthServiceImpl } from "../services/impl/auth.service.impl.js";

const authService = new AuthServiceImpl();

export async function register(req: Request, res: Response) {
  const { email, password, role } = req.body;
  try {
    const user = await authService.register(email, password, role);
    res.status(201).json(user);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const data = await authService.login(email, password);
    res.json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function profile(req: Request, res: Response) {
  // `req.user` is populated by authenticateJWT middleware
  const user = (req as any).user;
  res.json({ message: "Profile data", user });
}
