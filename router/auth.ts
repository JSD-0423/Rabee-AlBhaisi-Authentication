import { Router } from "express";
import { UserController } from "../controller/";

const userController = new UserController();
const router = Router();

router.get("/login", userController.login);

router.post("/signup", userController.signUp);

export default router;
