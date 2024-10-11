import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prismaClient.ts";

export const register = async (req: Request, res: Response) => {
  // [來自前端] username email password
  const { username, email, password } = req.body;

  // 驗證處理

  // 將密碼加密
  const hashedPassword = await bcrypt.hash(password, 10);
  // 建立一筆新的使用者資料
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ username: user.username, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "User already exists." }); // 要再處理
  }
};
