import { json } from "@remix-run/node";
import { Button, Card, } from "~/components";
import { ROUTES } from "~/utils/routes";
import type { LoaderArgs } from "@remix-run/node";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";
import { Link, useLoaderData } from "@remix-run/react";
import QRCode from "react-qr-code";

type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>;
    profile?: Awaited<ReturnType<typeof getProfileByEmail>>;
    errorMessage?: string;
    successMessage?: string;
};


export async function loader({ request, params }: LoaderArgs) {
    const user = await getUser(request);
    const profile = await getProfileByEmail(user.email || '')


    return json<LoaderData>({ user, profile });
}


export default function Awards() {
    const { profile } = useLoaderData<typeof loader>();


    return (
        <>
            <Card title={`Prémio disponível`} className="mb-7">
                <div className="flex items-center justify-center">
                    <QRCode value={`${profile?.contents?.awards[0].id}`} />
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center' }} >

                    Seu prêmio está disponível ao lado da lojinha, use este Qr code para retirar
                </div>
            </Card>

            <Link to={ROUTES.HOME}>
                <Button
                    className="mb-4"
                    primary
                    full
                >
                    Ir para home
                </Button>
            </Link>

        </>
    );
}