import { sanitize } from "@/utils/sanitizeInput";
import { Router } from "express";
import search from "./user-controller/search";

const router = Router();

router.get("/", sanitize, search);

export default router;
