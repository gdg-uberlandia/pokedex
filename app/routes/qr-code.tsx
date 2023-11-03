import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/features/users/user.server";
import { Button, Card } from "~/components";
import { ROUTES } from "~/utils/routes";
import QRCode from "react-qr-code";
import { getProfileByEmail } from "~/features/profiles/profile.server";

type LoaderData = {
  data: Awaited<ReturnType<typeof getUser>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
  url: string;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");
  const url = process.env.URL!;
  return json<LoaderData>({ data, profile, url });
}

export default function Index() {
  const { profile, url } = useLoaderData<typeof loader>();

  if (!profile) {
    throw redirect(ROUTES.LOGIN);
  }

  return (
    <>
      <Card title="Seu QR Code">
        <div className="flex items-center justify-center">
          <QRCode value={`${url}/profiles/${profile.id!}`} />
        </div>
      </Card>

      <Link to={ROUTES.HOME}>
        <Button className="mb-4" primary full>
          Voltar
        </Button>
      </Link>
    </>
  );
}
