
import { Router } from "express";
import { login,logout,register,getProfile } from "../controller/userController";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);

router.get("/logout",logout);

router.get("/me",getProfile);



export default router;