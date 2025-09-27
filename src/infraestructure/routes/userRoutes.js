import { Router } from "express";
import { createUser } from "../controllers/userController.js ";
import { getUsers } from "../controllers/userController.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);

export default router;