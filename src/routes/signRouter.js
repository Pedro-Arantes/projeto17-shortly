import { Router } from "express";
import { postSignIn,postSignUp  } from "../controllers/signController.js";

const router = Router();

router.post("/signin",postSignIn)
router.post("/signup",postSignUp)

export default router;