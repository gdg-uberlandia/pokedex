import { Card } from "~/components";
import { Talk as TalkComponent } from "./Talk";
import Evaluation from "./Evaluation";
import { talks } from "./mock";

export default function Talk() {
  const { trailName, ...talk } = talks[0];

  return (
    <Card title="Feedback">
      <h2 className="mb-8 text-center font-press text-[12px] text-black">
        Qual a sua avaliação para a palestra abaixo?
      </h2>

      <TalkComponent {...talk}>
        <Evaluation />
      </TalkComponent>
    </Card>
  );
}
