import { redirect, createCookieSessionStorage } from "@remix-run/node";
import { getSessionToken } from "~/models/auth.server";

export let storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
  },
});

export const { getSession, commitSession, destroySession } = storage;

export async function createUserSession(_: Request, idToken: string) {
  const token = await getSessionToken(idToken);
  const session = await getSession();

  session.set("token", token);

  const cookie = await commitSession(session, { maxAge: 604_800 });

  return redirect(process.env.PROFILE_URL, {
    headers: { "Set-Cookie": cookie },
  });
}

export async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    throw redirect(process.env.LOGIN_URL);
  }

  return session;
}
