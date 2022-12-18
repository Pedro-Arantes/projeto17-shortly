import { Router } from "express";
import { postShortUrl,getUrl,getUrlOpen,deleteUrl } from "../controllers/urlsController.js";
import { shortUrlMd } from "../middlewares/shortUrlSchemaMiddleware.js";
import { delUrlMd } from "../middlewares/delUrlMiddleware.js";

const router = Router();

router.post("/urls/shorten",shortUrlMd,postShortUrl)
router.get("/urls/:id",getUrl)
router.get("/urls/open/:shortUrl",getUrlOpen)
router.delete("/urls/:id",delUrlMd,deleteUrl)

export default router;