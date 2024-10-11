import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/libs/prismaClient.ts";
import { authConfig } from "@/config/auth.ts";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // 驗證處理
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: "Invalid credentials." });
    return; // 這裡需要結束函式的執行
  }

  // 生成 toekn
  const token = jwt.sign({ id: user.id }, authConfig.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token }); // 結束請求，無需明確返回
};
