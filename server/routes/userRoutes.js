

import { Router } from "express";
import { login,logout,register,getProfile } from "../controller/userController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router=Router();

router.post("/register",register);
router.post("/login",login);

router.get("/logout",logout);

router.get("/me",isLoggedIn,getProfile);



export default router;