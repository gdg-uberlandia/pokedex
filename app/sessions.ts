import { redirect, createCookieSessionStorage } from "@remix-run/node";
import { getSessionToken } from "~/models/auth.server";

export let rootStorage = createCookieSessionStorage({
  cookie: {
    name: "__session"
  },
});

const { getSession, commitSession, destroySession } = rootStorage;

export async function createUserSession(_: Request, idToken: string) {
  const token = await getSessionToken(idToken);
  const session = await getSession();

  session.set("token", token);

  const cookie = await commitSession(session, { maxAge: 604_800 });

  return redirect(process.env.PROFILE_URL || "/profile", {
    headers: { "Set-Cookie": cookie },
  });
}

export {
  getSession,
  commitSession,
  destroySession
}
