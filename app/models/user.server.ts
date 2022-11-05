import { redirect } from "@remix-run/node";
import firebaseAdmin from "firebase-admin";
import { destroySession } from "~/models/session.server";
import { getUserSession } from "~/models/session.server";

export async function getUser(request: Request) {
  const session = await getUserSession(request);
  const token = session.get("token");

  try {
    return await firebaseAdmin.auth().verifySessionCookie(token, true);
  } catch (error) {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);

  throw redirect(process.env.LOGIN_URL, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
