import express from "express";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(passport.initialize()); // 👈 required

app.use("/auth", authRoutes);

app.get("/", (_req, res) => res.send("🚀 Supabricx App Running"));

app.listen(3000, () => console.log("Server on http://localhost:3000"));