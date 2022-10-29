import { redirect } from "@remix-run/node";
import firebaseAdmin from "firebase-admin";
import { getSession, destroySession } from "~/sessions";

async function getUserSession(request: Request) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const token = session.get("token");

  if (!token) return null;

  try {
    const userToken = await firebaseAdmin
      .auth()
      .verifySessionCookie(token, true);

    return userToken;
  } catch (error) {
    return null;
  }
}

export async function getUser(request: Request) {
  const user = await getUserSession(request);

  if (!user) {
    return null;
  }

  return user;
}

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect(process.env.LOGIN_URL || "/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
