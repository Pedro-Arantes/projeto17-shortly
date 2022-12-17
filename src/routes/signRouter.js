import { Router } from "express";
import { postSignIn,postSignUp  } from "../controllers/signController.js";
import { signUpSchemaMd } from "../middlewares/signUpSchemaMiddleware.js";
import { signInSchemaMd } from "../middlewares/signInSchemaMiddleware.js";

const router = Router();

router.post("/signin",signInSchemaMd,postSignIn)
router.post("/signup",signUpSchemaMd,postSignUp)

export default router;