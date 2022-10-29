import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getApps } from "firebase-admin/app";

if (getApps().length === 0) {
  initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:
        process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(
          /\\n/gm,
          "\n"
        ) : undefined
    }),
  });
}

export async function getSessionToken(idToken: string) {
  const auth = admin.auth();
  const decodedToken = await auth.verifyIdToken(idToken);

  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }

  const twoWeeks = 60 * 60 * 24 * 14 * 1000;

  return auth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}
