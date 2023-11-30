import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import {
  Button,
  Card,
  Image,
  Profile as ProfileComponent,
  Skills,
} from "~/components";
import pokeball from "~/assets/images/pokeball.png";
import trophy from "~/assets/images/trofeu-pixel.png";
import { ROUTES } from "~/utils/routes";
import QrCodeImage from "~/assets/images/qr-code.svg";
import { getUser } from "~/features/users/user.server";
import { getProfileByEmail } from "~/features/profiles/profile.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");

  return json<LoaderData>({ data, profile });
}

export default function Profile() {
  const { profile } = useLoaderData<typeof loader>();

  if (!profile) {
    throw redirect(ROUTES.LOGIN);
  }

  const { awards } = profile?.contents;
  const consumed = awards?.[0]?.consumed;
  const hasAwardsToRetrieve = !!awards.length && !consumed;

  return (
    <>
      <Card className="mb-6" title="Seu perfil">
        <ProfileComponent
          className="mb-1"
          image={profile.user.photoUrl ?? ""}
          isAvatar
          name={profile.user.name}
        />

        <Skills
          content={profile.skills}
          className="[&:not(:last-child)]:mb-4"
        />

        {hasAwardsToRetrieve && (
          <Link to={`/awards/${profile?.contents?.awards?.[0].id}`}>
            <Button
              img={
                <Image
                  src={trophy}
                  alt="Resgate seu prêmio"
                  className="h-full"
                />
              }
              full
            >
              Resgate seu prêmio
            </Button>
          </Link>
        )}
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
          className="mb-4"
          img={<Image src={QrCodeImage} alt="Abrir meu QR code" />}
          primary
          full
        >
          Abrir meu QR code
        </Button>
      </Link>

      <Link to={ROUTES.SCHEDULE}>
        <Button className="mb-4" full>
          Avalie as palestras
        </Button>
      </Link>

      <Link to={ROUTES.UPDATE_PROFILE}>
        <Button full>Atualizar perfil</Button>
      </Link>

      <Form
        action="/logout"
        className="absolute inset-x-0 bottom-4"
        method="post"
      >
        <Button type="submit" full primary small>
          Sair
        </Button>
      </Form>
    </>
  );
}
