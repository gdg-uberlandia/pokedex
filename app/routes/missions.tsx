import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { Card, Image } from "~/components";
import { getUser } from "~/features/users/user.server";
import { List } from "~/components/List";
import { MISSIONS_LIST } from "~/features/missions/missions";

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");

  return json(profile);
}

export default function Missions() {
  const { skills: skillsFromAPI } = useLoaderData();

  return (
    <Card title="Confira sua missões">
      <List.Root>
        {MISSIONS_LIST.map(({ title, description, icon }) => (
          <List.Item
            key={title}
            title={title}
            description={description}
            Icon={
              <Image
                src={`/images/${icon.src}`}
                alt={icon.alt}
                className="h-11 w-11 object-contain"
              />
            }
          />
        ))}
      </List.Root>
    </Card>
  );
}
