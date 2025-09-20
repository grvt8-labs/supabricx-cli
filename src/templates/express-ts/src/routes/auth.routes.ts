import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

// 👇 Importing ensures passport strategies get registered
import "../strategies/google.js";
import "../strategies/github.js";
import passport from "passport";

const router = Router();

// JWT-based routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateJWT, profile);

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
