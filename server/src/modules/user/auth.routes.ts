import { sanitize } from "@/utils/sanitizeInput";
import { Router } from "express";
import isAuthenticated from "../middlewares/requireAuth";
import login from "./auth-controllers/login";
import logout from "./auth-controllers/logout";
import me from "./auth-controllers/me";
import refreshToken from "./auth-controllers/refresh";
import register from "./auth-controllers/register";
import { resetToken } from "./utils/resetToken";
import { validateRegister } from "./validators/validateRegister";

const router = Router();

router.post("/login", resetToken, sanitize, login);
router.post("/register", sanitize, validateRegister, register);
router.get("/refresh-token", refreshToken);
router.get("/logout", logout);
router.get("/me", isAuthenticated, me);

export default router;
