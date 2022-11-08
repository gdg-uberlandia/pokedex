import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { getUser } from "~/features/users/user.server";
import { Button, Card, Image, Profile, Tags } from "~/components";
import pokeball from "~/assets/images/pokeball.png";
import clock from "~/assets/images/clock.svg";
import { ROUTES } from "~/utils/routes";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  return json<LoaderData>({ data });
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  if (!data) {
    throw redirect(ROUTES.LOGIN);
  }

  return (
    <>
      <Card title="Seu perfil" className="mb-7">
        <Profile image={data.picture} name={data.name} isAvatar />
        <Tags tags={["#flutter", "#leadership"]} />
      </Card>

      <Link to={ROUTES.POKEDEX_PEOPLE}>
        <Button
          className="mb-4"
          img={<Image src={pokeball} alt="Ver Pokédex" className="h-full" />}
          primary
          full
        >
          Ver Pokédex
        </Button>
      </Link>

      <Form
        method="post"
        action="/logout"
        className="absolute inset-x-0 bottom-4"
      >
        <Button type="submit" full>
          Sair
        </Button>
      </Form>
    </>
  );
}
