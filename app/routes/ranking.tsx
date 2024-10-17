import { getRanking } from "~/features/ranking/ranking.server";
import { json } from "@remix-run/node";
import { RankItem } from "~/components";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import type { RankedUser as RankedUserType } from "~/features/ranking/types";

type LoaderData = {
  ranking: RankedUserType[];
};

export async function loader({ request }: LoaderArgs) {
  const ranking = await getRanking();
  return json<LoaderData>({ ranking });
}

export default function Ranking() {
  const { ranking } = useLoaderData<typeof loader>();
  return (
    <section className="flex flex-col">
      {ranking.map((rankedUser: RankedUserType, index) => (
        <RankItem
          image={rankedUser.avatarUrl}
          key={rankedUser.id}
          name={rankedUser.name}
          position={rankedUser.position}
          score={rankedUser.score}
        ></RankItem>
      ))}
    </section>
  );
}