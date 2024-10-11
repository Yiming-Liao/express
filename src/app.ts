import express from "express";
import { serverConfig } from "@/config/app.ts";
import router from "@/routes/index.ts";

const app = express();

app.use(express.json());

app.use(router); // 路由進入口

app.listen(serverConfig.PORT, () => {
  console.log(`[伺服器] 正在運行於 http://localhost:${serverConfig.PORT}`);
});
