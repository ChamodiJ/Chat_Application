import express from "express";
import { signup, login, updateProdfile } from "../controllers/userController.js";
import { checkAuth, protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProdfile);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;