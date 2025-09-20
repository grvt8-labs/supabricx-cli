import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser, profile } from "../controllers/user.controllers";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/profile", profile);

export default router;
