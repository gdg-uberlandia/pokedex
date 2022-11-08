import { redirect, createCookieSessionStorage } from "@remix-run/node";
import { getSessionToken, signOutFirebase } from "~/services/firebase.server";
import { ROUTES } from "~/utils/routes";


const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set!");
}

export let storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
  },
});

export const { getSession, commitSession, destroySession } = storage;


export async function createUserSession(_: Request, idToken: string, userId: string) {
  const token = await getSessionToken(idToken);
  const session = await getSession();

  session.set("token", token);
  session.set("userId", userId);

  const cookie = await commitSession(session, { maxAge: 604_800 });

  return redirect(ROUTES.HOME, {
    headers: { "Set-Cookie": cookie },
  });
}

export async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    throw redirect(ROUTES.LOGIN);
  }

  return session;
}

export async function signOut(request: Request) {
  await signOutFirebase();
  const session = await storage.getSession(request.headers.get("Cookie"));
  const newCookie = await storage.destroySession(session);
  return redirect(ROUTES.LOGIN, { headers: { "Set-Cookie": newCookie } });
}