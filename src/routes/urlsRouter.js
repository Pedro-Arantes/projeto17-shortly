import { Router } from "express";
import { postShortUrl,getUrl,getUrlOpen,deleteUrl } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten",postShortUrl)
router.get("/urls/:id",getUrl)
router.get("/urls/open/:shortUrl",getUrlOpen)
router.delete("/urls/:id",deleteUrl)

export default router;