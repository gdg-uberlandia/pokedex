import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import {
  Button,
  Card,
  Image,
  Profile as ProfileComponent,
  Skills,
} from "~/components";
import pokeball from "~/assets/images/pokeball.png";
import cheese from "~/assets/images/cheese.svg";
import { ROUTES } from "~/utils/routes";
import QrCodeImage from "~/assets/images/qr-code.svg";
import Gear from "~/assets/images/gear.png";
import { getUser } from "~/features/users/user.server";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import {
  MissionsCarrousel,
  links as missionsLinks,
} from "~/components/MissionsCarrousel";
import { LEVELS, LEVEL_THRESHOLD } from "~/utils/levels";
import clsx from "clsx";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export const links: LinksFunction = () => {
  return [...missionsLinks()];
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");

  return json<LoaderData>({ data, profile });
}

export default function Profile() {
  const { profile } = useLoaderData<typeof loader>();

  if (!profile) {
    throw redirect(ROUTES.LOGIN);
  }

  const levels = Object.entries(LEVELS);

  return (
    <>
      <Card title="Meus pontos">
        <section className="mb-3 px-2">
          <Link to={ROUTES.UPDATE_PROFILE}>
            <ProfileComponent
              className="relative mb-1"
              image={profile.user.photoUrl ?? ""}
              isAvatar
              name={profile.user.name}
            />
          </Link>
        </section>

        <section className="flex h-72 flex-col items-center justify-around gap-2">
          {levels.map(([key, value], i) => {
            const showScore = i + 1 >= LEVEL_THRESHOLD;

            if (!showScore) return null;

            return (
              <span
                className={clsx(
                  "relative flex items-start gap-2",
                  i < levels.length - 1 && "flex-1"
                )}
              >
                <div key={key} className="flex w-fit items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-devfest-orange">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </span>
                </div>

                <span
                  className={clsx(
                    "absolute left-[calc(1rem-1.5px)] top-9 h-[calc(100%-2rem)] w-[3px] bg-devfest-orange",
                    i === levels.length - 1 && "hidden"
                  )}
                />

                <p className="font-crux text-2xl">{value}</p>
              </span>
            );
          })}
        </section>
      </Card>
    </>
  );
}
