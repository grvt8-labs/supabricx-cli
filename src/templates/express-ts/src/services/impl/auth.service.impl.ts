import { db } from "../../configs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IAuthService } from "../auth.service.js";
import { User } from "@prisma/client";

export class AuthServiceImpl implements IAuthService {
  async register(email: string, password: string, role: string = "USER"): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    return db.user.create({
      data: { email, password: hashed, role: role as any, provider: "jwt" },
    });
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password || "");
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return { user, token };
  }
}
