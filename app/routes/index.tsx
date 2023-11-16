import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { ROUTES } from "~/utils/routes";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";
import { getSchedule } from "~/features/schedule/schedule.server";

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  // TODO: utilizar o schedule dessa forma onde for necessário
  const schedule = await getSchedule();
  const profile = await getProfileByEmail(data.email || "");

  if (!profile) {
    throw redirect(ROUTES.LOGIN);
  }

  return redirect(ROUTES.PROFILE);
}
