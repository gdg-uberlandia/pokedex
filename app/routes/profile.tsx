import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getUser } from "~/models/user.server";
import { Button, Card, Image, Logo, Tags } from '~/components'
import pokeball from '~/assets/images/pokeball.svg'
import clock from '~/assets/images/clock.svg'

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
    <main className="relative m-auto min-h-screen max-w-[320px] pt-7">
      <Logo />

      <Card title="Seu perfil" className="mb-4">
        <figure className="mb-2 flex justify-center">
          <img
            className="w-[90px] rounded-full"
            src={data.picture}
            alt={data.name}
          />
        </figure>
        <h1 className="font-press text-center text-xs font-normal text-black">
          {data.name}
        </h1>
        <Tags className="mb-4" tags={['#flutter', '#leadership']} />

        <Button className="mb-4" full>
          Ver selos
        </Button>
        <Button full>Ver missões</Button>
      </Card>

      <Button
        className="mb-4"
        img={<Image src={pokeball} alt="Ver Pokédex" />}
        primary
        full
        >
        Ver Pokédex
      </Button>
      <Button
        img={<Image src={clock} alt="Agenda do evento" />}
        primary
        full
      >
        Agenda do evento
      </Button>

      <Form method="post" action="/logout" className="absolute inset-x-0 bottom-4">
        <Button className="rounded bg-cyan-700 p-1 text-white" type="submit" full>
          Sair
        </Button>
      </Form>
    </main>
  );
}
