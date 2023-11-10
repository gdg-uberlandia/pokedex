import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Button, Card } from "~/components";
import { Talk } from "./Talk";
import { talks } from "./mock";
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

const renderButton = ({
  canBeEvaluated,
  isAdmin,
}: {
  canBeEvaluated: boolean;
  isAdmin: boolean;
}) => {
  const getLabel = () => {
    if (isAdmin) return "Liberar avaliação";

    return canBeEvaluated ? "Avaliar" : "Não disponível";
  };

  return (
    <Button disabled={!canBeEvaluated} full primary small>
      {getLabel()}
    </Button>
  );
};

export default function Talks() {
  // TODO: get this data from storage instead of API
  const { profile } = useLoaderData<typeof loader>();

  return (
    <Card title="Palestras">
      {talks.map((talk, key) => (
        <Talk key={key} {...talk}>
          <Link to={`/talks/${talk.id}`}>
            {renderButton({
              canBeEvaluated: talk.canBeEvaluated,
              isAdmin: profile?.user?.isAdmin ?? false,
            })}
          </Link>
        </Talk>
      ))}
    </Card>
  );
}
