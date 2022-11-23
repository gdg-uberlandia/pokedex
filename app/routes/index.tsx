import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { getUser } from "~/features/users/user.server";
import { Button, Card, Image, Profile, Tags } from "~/components";
import pokeball from "~/assets/images/pokeball.png";
import { ROUTES } from "~/utils/routes";
import QrCodeImage from "~/assets/images/qr-code.png";
import { getProfileByEmail } from "~/features/profiles/profile.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || '')
  return json<LoaderData>({ data, profile });
}

export default function Index() {
  const { data, profile } = useLoaderData<typeof loader>();

  if (!data || !profile) {
    throw redirect(ROUTES.LOGIN);
  }

  const QrButton = (
    <div style={{ backgroundColor: '#FFF', backgroundSize: '40px 40px', border: '5px' }}>
      <Image className={`w-[30px]`} src={QrCodeImage} alt="Abrir QR Code" />
    </div>
  );

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

      <Link to={ROUTES.QR_CODE}>
        <Button
          className="mb-4 block"
          img={QrButton}
          primary
          full
          type="button"
        >
          Abrir meu QR
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