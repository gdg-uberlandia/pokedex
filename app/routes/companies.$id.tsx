import { json } from "@remix-run/node";
import { Button, Card } from "~/components";
import { ROUTES } from "~/utils/routes";
import type { LoaderArgs } from "@remix-run/node";
import { addCompany } from "~/features/profiles/profile.server";
import { getUser } from "~/features/users/user.server";
import { Link, useLoaderData } from "@remix-run/react";
import { Profile } from "~/components/Profile";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ShowableError from "~/utils/errors";
import { getCompanyById } from "~/features/companies/company.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  company?: Awaited<ReturnType<typeof getCompanyById>>;
  errorMessage?: string;
  successMessage?: string;
};

export async function loader({ request, params }: LoaderArgs) {
  const user = await getUser(request);
  const company = await getCompanyById(params.id || "");

  try {
    await addCompany(user.email!, company);
  } catch (error) {
    if (error instanceof ShowableError)
      return json<LoaderData>({ user, company, errorMessage: error?.message });
    else
      return json<LoaderData>({
        user,
        company,
        errorMessage: "Houve um erro ao adicionar empresa",
      });
  }
  return json<LoaderData>({
    user,
    company,
    successMessage: "Empresa adicionada com sucesso!",
  });
}

export default function OtherCompanyProfile() {
  const { company, errorMessage, successMessage } =
    useLoaderData<typeof loader>();

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
    if (successMessage) toast.success(successMessage);
  }, [errorMessage, successMessage]);

  return (
    <>
      <Card title={`Empresa ${successMessage ? "adicionada" : ""}`}>
        <Profile image={company!.image} name={company!.name} isAvatar />
      </Card>

      <Link to={ROUTES.HOME}>
        <Button className="mb-4" primary full>
          Ir para home
        </Button>
      </Link>
    </>
  );
}
