import { sanitize } from "@/utils/sanitizeInput";
import { Router } from "express";
import isAuthenticated from "../middlewares/requireAuth";
import login from "./controllers/loginController";
import logout from "./controllers/logoutController";
import me from "./controllers/meController";
import refreshToken from "./controllers/refreshTokenController";
import register from "./controllers/registerController";
import { searchUser } from "./controllers/searchUserController";
import { resetToken } from "./utils/resetToken";
import { validateRegister } from "./validators/validateRegister";

const router = Router();

router.get("/", sanitize, searchUser);

router.post("/login", resetToken, sanitize, login);
router.post("/register", sanitize, validateRegister, register);
router.get("/refresh-token", refreshToken);
router.get("/logout", logout);
router.get("/me", isAuthenticated, me);

export default router;
