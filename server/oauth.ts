import { Request, Response } from "express";
import { upsertUser } from "./db";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function handleOAuthCallback(req: Request, res: Response) {
  const { code, state, error } = req.query;

  if (error) {
    return res.redirect(`/?error=${error}`);
  }

  if (!code || !state) {
    return res.status(400).json({ error: "Missing code or state" });
  }

  try {
    // Decode state to get redirect URI and return path
    let returnPath = "/academy";
    try {
      const stateData = JSON.parse(Buffer.from(state as string, "base64").toString());
      returnPath = stateData.returnPath || "/academy";
    } catch (e) {
      console.error("Failed to parse state:", e);
      // Fallback to default redirect
    }

    // Use the code as the unique user identifier (Manus OAuth token)
    const userOpenId = code as string;

    // Create or update user
    const userName = `User_${userOpenId.slice(0, 12)}`;
    const userEmail = `user_${userOpenId.slice(0, 12)}@silabs.academy`;
    
    await upsertUser({
      openId: userOpenId,
      name: userName,
      email: userEmail,
      loginMethod: "oauth",
    });
    
    console.log(`OAuth user created/updated: ${userOpenId}`);

    // Create session token
    const token = await createSessionToken(userOpenId);

    // Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none" as const,
      maxAge: ONE_YEAR_MS,
      path: "/",
    };

    res.cookie(COOKIE_NAME, token, cookieOptions);

    // Redirect to the app
    console.log(`OAuth callback successful for user ${userOpenId}, redirecting to ${returnPath}`);
    return res.redirect(returnPath);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return res.status(500).json({ error: "OAuth callback failed", details: String(error) });
  }
}

export async function createSessionToken(openId: string): Promise<string> {
  try {
    const token = await new SignJWT({ openId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1y")
      .sign(secretKey);

    return token;
  } catch (error) {
    console.error("Failed to create session token:", error);
    throw error;
  }
}

export async function verifySessionCookie(token: string): Promise<any> {
  try {
    const verified = await jwtVerify(token, secretKey);
    return verified.payload;
  } catch (error) {
    console.error("Failed to verify session cookie:", error);
    return null;
  }
}
