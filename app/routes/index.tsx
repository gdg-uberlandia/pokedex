import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { Button, Card, Image, Profile, Skills } from "~/components";
import pokeball from "~/assets/images/pokeball.png";
import { ROUTES } from "~/utils/routes";
import { getSession } from "~/features/users/session.server";
import { getById } from "~/features/profiles/profile.server";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const data = await getById(session.get("userId"));

  return json(data);
}

export default function Index() {
  const { user, skills } = useLoaderData();

  if (!user) {
    throw redirect(ROUTES.LOGIN);
  }

  return (
    <>
      <Card className="mb-7" title="Seu perfil">
        <Profile
          className="mb-1"
          image={user.photoUrl}
          isAvatar
          name={user.name}
        />
        <Skills content={skills} className="mb-2" />

        <Link to={ROUTES.UPDATE_PROFILE}>
          <Button full>Atualizar perfil</Button>
        </Link>
      </Card>

      <Link to={ROUTES.POKEDEX_PEOPLE}>
        <Button
          className="mb-4"
          full
          img={<Image src={pokeball} alt="Ver Pokédex" className="h-full" />}
          primary
        >
          Ver Pokédex
        </Button>
      </Link>

      <Form
        action="/logout"
        className="absolute inset-x-0 bottom-4"
        method="post"
      >
        <Button full type="submit">
          Sair
        </Button>
      </Form>
    </>
  );
}
