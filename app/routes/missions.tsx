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

  return json(profile!);
}

export default function Missions() {
  const {
    contents: { missions = [] },
  } = useLoaderData<typeof loader>();

  const missionsMap = new Map(missions.map(({ id }) => [id, id]));

  // to change indexes of the list items
  const rnd = Math.floor(Math.random() * 10);

  return (
    <Card
      title="Confira sua missões"
      articleProps={{
        className: "!p-0",
      }}
    >
      <List.Root>
        {MISSIONS_LIST.map(({ title, description, icon, id }, index) => (
          <List.Item
            key={id}
            title={title}
            description={description}
            selected={!!missionsMap.get(id)}
            Icon={
              <Image
                src={`/images/${icon.src}`}
                alt={icon.alt}
                className="h-11 w-11 object-contain"
              />
            }
            index={index + rnd}
          />
        ))}
      </List.Root>
    </Card>
  );
}
