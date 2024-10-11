import { Request, Response, Router } from "express";
import authRouter from "@/routes/auth/authRoutes.ts";

const router = Router();

router.use("/api/auth", authRouter); // 將路由掛載在 /api/auth

router.route("/").get((req: Request, res: Response) => {
  res.send("Hello world!");
});

export default router;
