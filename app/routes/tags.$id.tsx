import { json } from "@remix-run/node";
import { Button, Card, } from "~/components";
import { ROUTES } from "~/utils/routes";
import type { LoaderArgs } from "@remix-run/node";
import { addTag } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";
import { Link, useLoaderData } from "@remix-run/react";
import { Profile } from "~/components/Profile";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ShowableError from "~/utils/errors";
import { getTagById } from "~/features/tags/tags.server";
import { image } from "remix-utils";

type LoaderData = {
    user: Awaited<ReturnType<typeof getUser>>;
    tag?: Awaited<ReturnType<typeof getTagById>>;
    errorMessage?: string;
    successMessage?: string;
};


export async function loader({ request, params }: LoaderArgs) {
    const user = await getUser(request);
    const tag = await getTagById(params.id || '')

    try {
        await addTag(user.email!, tag)

    } catch (error) {

        if (error instanceof ShowableError)
            return json<LoaderData>({ user, tag, errorMessage: error?.message });
        else
            return json<LoaderData>({ user, tag, errorMessage: 'Houve um erro ao adicionar tag' });
    }
    return json<LoaderData>({ user, tag, successMessage: 'Tag adicionada com sucesso!' });
}


export default function OtherTag() {
    const { tag, errorMessage, successMessage } = useLoaderData<typeof loader>();

    useEffect(() => {
        if (errorMessage) toast.error(errorMessage)
        if (successMessage) toast.success(successMessage)
    }, [])

      <Card title={`Tag ${successMessage ? "adicionada" : ""}`}>

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