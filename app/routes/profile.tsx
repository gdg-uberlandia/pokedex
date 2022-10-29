import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { getUser } from "~/models/user.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ data });
}

export default function Profile() {
  const { data } = useLoaderData<typeof loader>();

  if (!data) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center sm:px-6 lg:px-8">
        <img
          className="mb-2 w-28 rounded-full"
          src={data.picture}
          alt={data.name}
        />
        <h1 className="mb-2 text-center text-lg font-extrabold uppercase tracking-tight text-cyan-700 drop-shadow-md">
          {data.name}
        </h1>

        <Form method="post" action="/logout">
          <button className="rounded bg-cyan-700 p-1 text-white" type="submit">
            Logout
          </button>
        </Form>
      </div>
    </main>
  );
}
