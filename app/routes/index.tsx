import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { Button, Card, Image, Profile, Skills } from "~/components";
import pokeball from "~/assets/images/pokeball.png";
import trofeu from "~/assets/images/trofeu-pixel.png";
import { ROUTES } from "~/utils/routes";
import QrCodeImage from "~/assets/images/qr-code.png";
import Coin from "~/assets/images/coin_.png";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";
import { getSchedule } from "~/features/schedule/schedule.server"
import { getLevelByScore } from "~/utils/levels";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  // TODO: utilizar o schedule dessa forma onde for necessário
  const schedule = await getSchedule();
  const profile = await getProfileByEmail(data.email || "");
  return json<LoaderData>({ data, profile });
}

export default function Index() {
  const { profile } = useLoaderData<typeof loader>();

  if (!profile) {
    throw redirect(ROUTES.LOGIN);
  }

  const parseAward = () => {
    const consumed = profile?.contents?.awards[0].consumed;

    if (consumed) {
      return "Prêmio Retirado";
    } else {
      return (
        <Link to={`/awards/${profile?.contents?.awards[0].id}`}>
          <div>
            Prêmio Disponível <br />
            <span style={{ fontSize: "10px" }}>
              (Clique aqui para visualizar)
            </span>
          </div>
        </Link>
      );
    }
  };
  const parseStatusAward = () => {
    if (profile.contents?.awards?.length) {
      return (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            fontFamily: "PressStart",
            backgroundColor: "black",
            color: "white",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <Image
            src={trofeu}
            style={{ height: 25 }}
            alt="Ver Pokédex"
            className="h-full"
          />
          <div style={{ marginLeft: 10, fontSize: 14 }}>{parseAward()}</div>
        </div>
      );
    } else return "";
  };

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
      <Card className="mb-16" title="Seu perfil">
        <Profile
          className="mb-1"
          image={profile.user.photoUrl ?? ""}
          isAvatar
          name={profile.user.name}
        />
        <Skills content={profile.skills} className="mb-2" />

        <hr />
        <div style={{ margin: "0 auto", paddingTop: "30px" }}>
          <p style={{ fontFamily: "PressStart" }}>
            Level: {getLevelByScore(profile!.score!)}
          </p>

          <div className="grid auto-cols-max grid-flow-col">
            <Image className={`w-[20px]`} src={Coin} alt="coin" />
            <span
              style={{
                fontFamily: "PressStart",
                marginLeft: "10px",
                paddingTop: "5px",
              }}
            >
              {profile.score} points
            </span>
          </div>
        </div>
        {parseStatusAward()}
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
