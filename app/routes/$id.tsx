import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

import { getPokemon } from "~/models/pokemon.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getPokemon>>;
};

export async function loader({ params }: LoaderArgs) {
  const data = await getPokemon(params.id);

  console.log("🚀 ~ file: $id.tsx ~ line 13 ~ loader ~ data", data);

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ data });
}


export default function Pokemon() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <img
          className="m-auto"
          src={data.sprites.front_shiny}
          alt={data.name}
        />
        <h1 className="text-center text-lg font-extrabold uppercase tracking-tight text-blue-700 drop-shadow-md">
          {data.name}
        </h1>
      </div>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
