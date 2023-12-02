import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/features/users/user.server";
import { Button, Card } from "~/components";
import { ROUTES } from "~/utils/routes";
import QRCode from "react-qr-code";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { generateQrcode } from "~/features/qrcode/qrcode.server";

type LoaderData = {
  qrcodeUrl?: string;
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");
  let qrcodeUrl;
  if (profile?.id) {
    qrcodeUrl = generateQrcode(request, profile.id);
  }

  return json<LoaderData>({ qrcodeUrl });
}

export default function Index() {
  const { qrcodeUrl } = useLoaderData<typeof loader>();

  if (!qrcodeUrl) {
    throw redirect(ROUTES.LOGIN);
  }

  return (
    <>
      <Card title="Seu QR Code">
        <div className="flex items-center justify-center">
          <QRCode value={qrcodeUrl} />
        </div>
      </Card>
    </>
  );
}
