import { json } from "@remix-run/node";
import { Button, Card } from "~/components";
import { ROUTES } from "~/utils/routes";
import type { LoaderArgs } from "@remix-run/node";
import { addProfile, getProfileById } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";
import { Link, useLoaderData } from "@remix-run/react";
import { Profile } from "~/components/Profile";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ShowableError from "~/utils/errors";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  profile?: Awaited<ReturnType<typeof getProfileById>>;
  errorMessage?: string;
  successMessage?: string;
};

export async function loader({ request, params }: LoaderArgs) {
  const user = await getUser(request);
  const profile = await getProfileById(params.id || "");

  try {
    await addProfile(user.email!, profile);
  } catch (error) {
    if (error instanceof ShowableError)
      return json<LoaderData>({ user, profile, errorMessage: error?.message });
    else
      return json<LoaderData>({
        user,
        profile,
        errorMessage: "Houve um erro ao adicionar perfil",
      });
  }
  return json<LoaderData>({
    user,
    profile,
    successMessage: "Perfil adicionado com sucesso!",
  });
}

export default function OtherUserProfile() {
  const { profile, errorMessage, successMessage } =
    useLoaderData<typeof loader>();
  const _userFromScannedProfile = profile?.user;
  const _name = _userFromScannedProfile?.name || "";
  const _photoUrl = _userFromScannedProfile?.photoUrl || "";

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
    if (successMessage) toast.success(successMessage);
  }, [errorMessage, successMessage]);

  return (
    <>
      <Card
        title={`Perfil ${successMessage ? "adicionado" : ""}`}
        className="mb-7"
      >
        <Profile image={_photoUrl} name={_name} isAvatar />
      </Card>

      <Link to={ROUTES.HOME}>
        <Button className="mb-4" primary full>
          Ir para home
        </Button>
      </Link>
    </>
  );
}
