import { User } from "@/models/User.ts"; // 假設你有一個 User 類型定義

declare global {
  namespace Express {
    interface Request {
      user?: User; // 可以將 User 改成你具體的用戶類型
    }
  }
}
