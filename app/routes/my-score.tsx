import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Card, Profile as ProfileComponent, Image } from "~/components";
import { ROUTES } from "~/utils/routes";
import { getUser } from "~/features/users/user.server";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { links as missionsLinks } from "~/components/MissionsCarrousel";
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

        <section className="mx-auto flex h-96 w-fit flex-col gap-2">
          {levels.map(([key, value], i) => {
            const score = profile?.score ?? 0;
            const alreadyAchieved = score >= value;
            const isYourLevel =
              score >= levels[i][1] && score < levels[i + 1][1];

            const isThreshold = Number(key) === LEVEL_THRESHOLD;

            return (
              <span
                className={clsx(
                  "relative flex items-start gap-2",
                  i < levels.length - 1 && "flex-1"
                )}
              >
                <div
                  key={key}
                  className="relative flex w-fit items-center gap-2"
                >
                  {isThreshold && (
                    <div className="absolute -left-12 flex items-center">
                      <Image
                        src={"/images/trophy.png"}
                        alt="Seu prêmio"
                        className="h-6"
                      />

                      <span className="ml-2 flex h-2 w-2 border-y-8 border-r-0 border-l-8 border-solid border-y-transparent border-l-devfest-orange" />
                    </div>
                  )}

                  <span
                    className={clsx(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      alreadyAchieved ? "bg-devfest-orange" : "bg-gray"
                    )}
                  >
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </span>
                </div>

                <span
                  className={clsx(
                    "absolute left-[calc(1rem-1.5px)] top-9 h-[calc(100%-2rem)] w-[3px]",
                    i === levels.length - 1 && "hidden",
                    alreadyAchieved ? "bg-devfest-orange" : "bg-gray"
                  )}
                >
                  {isYourLevel && (
                    <article className="absolute flex items-center gap-1">
                      <span className="ml-2 flex h-2 w-2 border-y-8 border-r-8 border-l-0 border-solid border-y-transparent border-r-devfest-orange" />

                      <ProfileComponent
                        className="h-6 w-6"
                        image={profile.user.photoUrl ?? ""}
                        isAvatar
                      />
                    </article>
                  )}
                </span>

                <p className="font-crux text-xl">{value}</p>
              </span>
            );
          })}
        </section>
      </Card>
    </>
  );
}
