import { Router } from "express";
import {
  allUsers,
  loginUser,
  myAccount,
  registerUser,
} from "../controllers/userController";
import { isAdminCheck, isAuthenticated, isUserCheck } from "../middlewares";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", isAuthenticated, isUserCheck, myAccount);
userRouter.get("/all", isAuthenticated, isAdminCheck, allUsers);

export default userRouter;
