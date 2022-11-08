import { redirect } from "@remix-run/node";
import firebaseAdmin from "firebase-admin";
import { destroySession } from "~/features/users/session.server";
import { getUserSession } from "~/features/users/session.server";
import { ROUTES } from "~/utils/routes";
import { getProfileByCode, updateProfile } from "../profiles/profile.server";
import type { Profile } from "../profiles/types";
import type { User } from "./types";

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

  throw redirect(ROUTES.LOGIN, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export async function syncProfile(request: Request, user: User) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    //TODO redirecionar com erro
    return;
  }
  // 1. Get Profile with this code
  const profile: Profile | null = await getProfileByCode(code);

  await updateProfile(profile!.id, { ...profile!, user });
}
