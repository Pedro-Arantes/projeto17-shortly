import { Router } from "express";
import { getUsers,getRanking } from "../controllers/usersController.js";

const router = Router();

router.get("/users/me",getUsers)
router.get("/ranking",getRanking)

export default router;