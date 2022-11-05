import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Profile } from "~/components";
import { getPeople } from "~/models/pokedex.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getPeople>>;
};

export async function loader() {
  const data = await getPeople();

  return json<LoaderData>({ data });
}

export default function People() {
  const { data } = useLoaderData<typeof loader>();

  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((data, key) => (
        <a key={key} href={data.url} target="_blank" rel="noreferrer">
          <Profile
            image={data.image}
            name={data.name}
            className="h-full"
            isAvatar
          />
        </a>
      ))}
    </div>
  );
}
