import { Request, Response, Router } from "express";
import { register } from "@/controllers/auth/registerController.ts";
import { login } from "@/controllers/auth/loginController.ts";
import { authMiddleware } from "@/middleware/authMiddleware.ts";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

// 使用中間件來保護這個路由
router
  .route("/protected")
  .get(authMiddleware, (req: Request, res: Response) => {
    res.json({ message: "This is a protected route", user: req.user });
  });

export default router;
