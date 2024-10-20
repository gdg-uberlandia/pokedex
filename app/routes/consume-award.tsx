import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate, useRevalidator } from "@remix-run/react";
import { getUser } from "~/features/users/user.server";
import { Button, Card, QrReader } from "~/components";

import { getProfileByEmail } from "~/features/profiles/profile.server";
import { ROUTES } from "~/utils/routes";
import { useState } from "react";
import { set } from "lodash";

type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>;
    profile: Awaited<ReturnType<typeof getProfileByEmail>>;
};

export async function loader({ request }: LoaderArgs) {
    const user = await getUser(request);
    const profile = await getProfileByEmail(user.email || "");

    return json<LoaderData>({ user, profile });
}

export default function Index() {
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    const { profile } = useLoaderData<typeof loader>();

    const [disabled, setDisabled] = useState<boolean | undefined>(false);

    if ((profile?.user?.isAdmin == null || !profile?.user?.isAdmin)) {
        navigate(ROUTES.LOGIN);
    }


    const fetchQrCode = async (code: string) => {

        try {
            const response = await fetch('/api/validate',
                {
                    body: JSON.stringify({ code }),
                    method: 'POST'
                });

            const data = await response.json()
            console.log(data);

            if (response.status != 200) {
                return { result: false, message: "Erro ao consumir premio" };
            }
            if (!data.success) {
                return { result: false, message: "Erro ao consumir premio" };
            }

            return { result: true, message: "Consumido com sucesso!" };
        } catch (error) {
            return false;
        }
    }

    const onResultSuccess = async (code: any) => {
        try {

            setDisabled(true);
            const result = await fetchQrCode(code);
        } catch (error) {
            console.log(error);
        }


    }

    const onRefresh = () => {
        setDisabled(false);
    }

    return (
        <>
            <Card title="Consuma o premio pelo QR Code">
                <div className="flex items-center justify-center">
                    {/*<QRCode value={qrcodeUrl} />*/}
                    <QrReader onResultSuccess={onResultSuccess} disabled={disabled} />
                </div>

            </Card>

        </>
    );
}
