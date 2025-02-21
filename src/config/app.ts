import dotenv from "dotenv";

dotenv.config(); // 載入環境變數

export const serverConfig = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
};
