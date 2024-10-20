import type { LinksFunction, LoaderArgs } from "@remix-run/node";
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
import cheese from "~/assets/images/cheese.svg";
import { ROUTES } from "~/utils/routes";
import QrCodeImage from "~/assets/images/qr-code.svg";
import Star from "~/assets/images/star.png";
import Gear from "~/assets/images/gear.png";
import { getUser } from "~/features/users/user.server";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import {
  MissionsCarrousel,
  links as missionsLinks,
} from "~/components/MissionsCarrousel";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export const links: LinksFunction = () => {
  return [...missionsLinks()];
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

  const AdminButtons = () => {

    if (profile.user.isAdmin) {
      return (
        <Link to={ROUTES.CONSUME_AWARD}>
          <Button className="mb-4" full>
            Consumir premio
          </Button>
        </Link>
      )
    }
  }


  return (
    <>
      <Card
        className="mb-2"
        articleProps={{
          className: "px-0",
        }}
        title="Seu perfil"
      >
        <section className="px-2">
          <Link to={ROUTES.UPDATE_PROFILE}>
            <ProfileComponent
              className="relative mb-1"
              image={profile.user.photoUrl ?? ""}
              isAvatar
              name={profile.user.name}
            >
              <div className="absolute z-10 h-full w-[90px]">
                <Image
                  src={Gear}
                  alt="Atualizar perfil"
                  className="absolute right-0 top-0 h-6 w-6"
                />
              </div>
            </ProfileComponent>
          </Link>

          <Skills
            content={profile.skills}
            className="[&:not(:last-child)]:mb-4"
          />

          {hasAwardsToRetrieve && (
            <Link to={`/awards/${profile?.contents?.awards?.[0].id}`}>
              <Button
                img={
                  <Image
                    src={"/images/trophy.png"}
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
        </section>

        <MissionsCarrousel missions={profile.contents.missions} />

        <section className="px-2">
          <Link to={ROUTES.MISSIONS}>
            <Button
              full
              primary={hasAwardsToRetrieve}
              className="mt-2 !font-crux !text-[25px]"
              img={
                <Image
                  src={cheese}
                  alt="Confira suas missões"
                  className="h-full"
                />
              }
            >
              Ver missões
            </Button>
          </Link>
        </section>
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

      <Link to={ROUTES.MY_SCORE}>
        <Button
          className="mb-4"
          img={
            <Image
              src={"/images/trophy.png"}
              alt="Ver meus pontos"
              className="h-full"
            />
          }
          full
          primary
        >
          Ver meus pontos
        </Button>
      </Link>
      <Link to={ROUTES.RANKING}>
        <Button
          className="mb-4"
          img={<Image src={Star} alt="Abrir ranking" />}
          primary
          full
        >
          Ver ranking
        </Button>
      </Link>

      <Link to={ROUTES.SCHEDULE}>
        <Button className="mb-4" full>
          Avalie as palestras
        </Button>
      </Link>

      {AdminButtons()}

      <Form
        action="/logout"
        className="inset-x-0 tall:absolute tall:mx-2 pb-4"
        method="post"
      >
        <Button type="submit" full primary>
          Sair
        </Button>
      </Form>
    </>
  );
}
