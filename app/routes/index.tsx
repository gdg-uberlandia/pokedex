import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { Button, Card, Image, Profile, Skills } from "~/components";
import pokeball from "~/assets/images/pokeball.png";
import { ROUTES } from "~/utils/routes";
import QrCodeImage from "~/assets/images/qr-code.png";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";
import { getLevelByScore } from "~/utils/levels";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");
  return json<LoaderData>({ data, profile });
}

export default function Index() {
  const { profile } = useLoaderData<typeof loader>();

  if (!profile) {
    throw redirect(ROUTES.LOGIN);
  }

  const QrButton = (
    <div
      style={{
        backgroundColor: "#FFF",
        backgroundSize: "40px 40px",
        border: "5px",
      }}
    >
      <Image className={`w-[30px]`} src={QrCodeImage} alt="Abrir QR Code" />
    </div>
  );

  return (
    <>
      <Card className="mb-7" title="Seu perfil">
        <Profile
          className="mb-1"
          image={profile.user.photoUrl ?? ""}
          isAvatar
          name={profile.user.name}
        />
        <Skills content={profile.skills} className="mb-2" />

        <hr />
        <div style={{ margin: '0 auto', paddingTop: '30px' }}>
          <p style={{ fontFamily: 'PressStart' }}>Level: {getLevelByScore(profile!.score!)}</p>

          <p style={{ fontFamily: 'PressStart' }}>{profile.score}</p>
        </div>
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

      <div>
        <Link to={ROUTES.UPDATE_PROFILE}>
          <Button full>Atualizar perfil</Button>
        </Link>
      </div>
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
