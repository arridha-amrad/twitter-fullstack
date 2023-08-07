import { Router } from "express";
import login from "./controllers/loginController";
import logout from "./controllers/logoutController";
import me from "./controllers/meController";
import refreshToken from "./controllers/refreshTokenController";
import register from "./controllers/registerController";
import { validateRegister } from "./validators/validateRegister";
import { loginGuard } from "./utils/loginGuard";
import { sanitize } from "@/utils/sanitizeInput";
import { authenticationGuard } from "@/utils/authenticationGuard";
import { searchUser } from "./controllers/searchUserController";

const router = Router();

router.get("/", sanitize, searchUser);

router.post("/login", loginGuard, sanitize, login);
router.post("/register", sanitize, validateRegister, register);
router.get("/refresh-token", refreshToken);
router.get("/logout", logout);
router.get("/me", authenticationGuard, me);

export default router;
