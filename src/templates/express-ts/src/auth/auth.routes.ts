import { Router } from "express";
import { AuthService } from "./auth.service.js";
import passport from "passport";

const router = Router();

// JWT auth
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await AuthService.register(email, password, role);
    res.json(user);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await AuthService.login(email, password);
    res.json(data);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("✅ Google Auth Success");
  }
);

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.send("✅ GitHub Auth Success");
  }
);

export default router;
