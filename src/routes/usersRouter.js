import { Router } from "express";
import { getUsers,getRanking } from "../controllers/usersController.js";
import { getUserMd } from "../middlewares/getUserMiddleware.js";
const router = Router();

router.get("/users/me",getUserMd,getUsers)
router.get("/ranking",getRanking)

export default router;