import { Button } from "~/components";
import { evaluationsHoverBgColor, evaluations } from "./constants";

export default function Evaluation() {
  const evaluationsWithColor = () =>
    evaluations.map((evaluation, index) => ({
      ...evaluation,
      hoverBg: evaluationsHoverBgColor[index],
    }));

  return (
    <>
      {evaluationsWithColor().map(({ id, value, label, hoverBg }) => (
        <Button
          key={id}
          full
          primary
          small
          onClick={() => console.log(value)}
          className={`${hoverBg} [&:not(:last-child)]:mb-2`}
        >
          {label}
        </Button>
      ))}
    </>
  );
}
