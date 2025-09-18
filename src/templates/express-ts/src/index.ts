import express from "express";
import authRoutes from "./auth/auth.routes";  
import passport from "passport";
import "./auth/strategies/google";
import "./auth/strategies/github";


const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Supabricx App Running!");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
