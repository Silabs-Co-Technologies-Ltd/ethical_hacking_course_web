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
    // Decode state to get redirect URI
    let redirectUri = "/academy";
    try {
      const stateData = JSON.parse(Buffer.from(state as string, "base64").toString());
      redirectUri = stateData.returnPath || "/academy";
    } catch (e) {
      // Fallback to default redirect
    }

    // In a real implementation, you would exchange the code for a token
    // For now, we'll create a session with the code as the user identifier
    const userOpenId = `oauth_${code}`;

    // Create or update user
    await upsertUser({
      openId: userOpenId,
      name: `User ${userOpenId.slice(0, 8)}`,
      email: `user_${userOpenId.slice(0, 8)}@example.com`,
      loginMethod: "oauth",
    });

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
    return res.redirect(redirectUri);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return res.status(500).json({ error: "OAuth callback failed" });
  }
}

export async function createSessionToken(openId: string): Promise<string> {
  const token = await new SignJWT({ openId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1y")
    .sign(secretKey);

  return token;
}

export async function verifySessionCookie(token: string): Promise<any> {
  try {
    const verified = await jwtVerify(token, secretKey);
    return verified.payload;
  } catch (error) {
    return null;
  }
}
