import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getRandomPokemon } from "~/models/pokemon.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getRandomPokemon>>;
};

export const loader = async () => {
  return json<LoaderData>({
    data: await getRandomPokemon(),
  });
};

export default function Index() {
  const { data } = useLoaderData() as LoaderData;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link
          to={{
            pathname: `/${data.id}`
          }}
        >
          <img
            className="m-auto"
            src={data.sprites.front_default}
            alt={data.name}
          />
          <h1 className="text-center text-lg font-extrabold uppercase tracking-tight text-yellow-500 drop-shadow-md">
            {data.name}
          </h1>
        </Link>
      </div>
    </main>
  );
}
