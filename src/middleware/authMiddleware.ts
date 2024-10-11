import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth.ts"; // 確保這個路徑正確

export const authMiddleware = (
  req: Request, // 使用自定義接口
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1]; // 從授權標頭中獲取 token

  if (!token) {
    console.log("No token provided.");
    res.sendStatus(401); // 沒有 token 返回 401
    return; // 確保不再執行下一步
  }

  jwt.verify(token, authConfig.JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.log("Token verification failed:", err);
      res.sendStatus(403); // token 無效返回 403
      return; // 確保不再執行下一步
    }

    req.user = user; // 將解碼的用戶信息附加到請求對象上
    next(); // 繼續處理請求
  });
};
