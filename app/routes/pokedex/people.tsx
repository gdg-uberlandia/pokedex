import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { Profile } from "~/components";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";

type LoaderData = {
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");

  return json<LoaderData>({ profile });
}

export default function People() {
  const { profile } = useLoaderData<typeof loader>();
  const contents = profile?.contents;

  if (!contents?.profiles.length) {
    return (
      <h4 className="font-press text-sm">Nenhuma pessoa na sua Pokédex</h4>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {contents?.profiles.map((data, key) => (
        <a key={key} href={data.url} target="_blank" rel="noreferrer">
          <Profile
            image={data?.user?.photoUrl ?? ""}
            name={data?.user?.name ?? ""}
            className="h-full"
            isAvatar
          />
        </a>
      ))}
    </div>
  );
}
