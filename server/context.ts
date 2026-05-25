import { Request, Response } from "express";
import { getUserByOpenId } from "./db";
import { verifySessionCookie } from "./oauth";

export interface TrpcContext {
  user: any;
  req: Request;
  res: Response;
}

export async function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<TrpcContext> {
  let user = null;

  try {
    const sessionToken = req.cookies["manus_session"];
    if (sessionToken) {
      const decoded = verifySessionCookie(sessionToken);
      if (decoded && decoded.openId) {
        user = await getUserByOpenId(decoded.openId);
      }
    }
  } catch (error) {
    console.error("Error verifying session:", error);
  }

  return {
    user,
    req,
    res,
  };
}
