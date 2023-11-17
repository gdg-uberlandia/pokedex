import { Button } from "~/components";
import { evaluationsColors, evaluations } from "./constants";

function Evaluation({
  data: { scheduleId, userEmail, ...rest },
}: {
  data: {
    scheduleId?: string;
    speakerSlug: string;
    evaluatedBy?: string;
    userEmail?: string;
  };
}) {
  const evaluationsWithColor = () =>
    evaluations.map((evaluation, index) => ({
      ...evaluation,
      hoverBg: evaluationsColors[index],
    }));

  const getEvaluationData = (score: number) =>
    JSON.stringify({
      scheduleId,
      evaluation: {
        ...rest,
        score,
      },
      userEmail,
    });

  return (
    <>
      {evaluationsWithColor().map(({ score, label, hoverBg }) => (
        <Button
          key={score}
          full
          primary
          small
          type="submit"
          name="_form"
          value={getEvaluationData(score)}
          className={`${hoverBg} [&:not(:last-child)]:mb-2`}
        >
          {label}
        </Button>
      ))}
    </>
  );
}

export { Evaluation };
