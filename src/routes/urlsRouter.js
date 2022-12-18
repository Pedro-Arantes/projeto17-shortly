import { Router } from "express";
import { postShortUrl,getUrl,getUrlOpen,deleteUrl } from "../controllers/urlsController.js";
import { shortUrlMd } from "../middlewares/shortUrlSchemaMiddleware.js";

const router = Router();

router.post("/urls/shorten",shortUrlMd,postShortUrl)
router.get("/urls/:id",getUrl)
router.get("/urls/open/:shortUrl",getUrlOpen)
router.delete("/urls/:id",deleteUrl)

export default router;