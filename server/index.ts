import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { appRouter } from "./routers";
import { createContext } from "./context";
import { COOKIE_NAME } from "@shared/const";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { handleOAuthCallback } from "./oauth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // OAuth callback handler
  app.get("/api/oauth/callback", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handleOAuthCallback(req, res);
    } catch (error) {
      console.error("OAuth callback error:", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });

  // tRPC API routes
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
      onError: ({ path, error }) => {
        console.error(`tRPC error on path "${path}":`, error);
      },
    })
  );

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
