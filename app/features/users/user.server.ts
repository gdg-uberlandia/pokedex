import { redirect } from "@remix-run/node";
import firebaseAdmin from "firebase-admin";
import {
  getUserSession,
  destroySession,
} from "~/features/users/session.server";
import { ROUTES } from "~/utils/routes";

export async function getUser(request: Request) {
  const session = await getUserSession(request);
  const token = session.get("token");

  try {
    return await firebaseAdmin.auth().verifySessionCookie(token);
  } catch (error) {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);

  throw redirect(ROUTES.LOGIN, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
