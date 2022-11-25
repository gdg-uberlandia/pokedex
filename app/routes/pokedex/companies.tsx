import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Profile } from "~/components";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");
  return json<LoaderData>({ data, profile });
}

export default function Companies() {
  const { profile } = useLoaderData<typeof loader>();

  if (!profile) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {profile?.contents?.companies.map((data, key) => (
        <a key={key} href={data.url} target="_blank" rel="noreferrer">
          <Profile image={data.image} name={data.name} className="h-full" />
        </a>
      ))}
    </div>
  );
}
