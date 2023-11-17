import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components";
import { Talk as TalkComponent } from "./Talk";
import Evaluation from "./Evaluation";
import { getSpeakerById } from "~/features/speakers/speakers.schedule.server";

type LoaderData = {
  speaker: Awaited<ReturnType<typeof getSpeakerById>>;
};

export async function loader({ params }: LoaderArgs) {
  const speaker = await getSpeakerById(params.id);

  return json<LoaderData>({ speaker });
}

export default function Talk() {
  const { speaker } = useLoaderData<typeof loader>();

  return (
    <Card title="Feedback">
      <h2 className="mb-8 text-center font-press text-[12px] text-black">
        Qual a sua avaliação para a palestra abaixo?
      </h2>

      <TalkComponent {...speaker}>
        <Evaluation />
      </TalkComponent>
    </Card>
  );
}
