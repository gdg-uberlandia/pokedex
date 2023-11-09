import { Link } from "@remix-run/react";
import { Button, Chip, Profile } from "~/components";

interface Props {
  id: string;
  trailName: string;
  trailColor: string;
  trailBgColor: string;
  image: string;
  title: string;
  speaker: string;
  canBeEvaluated: boolean;
}

export default function Talk({
  id,
  trailName,
  trailBgColor,
  trailColor,
  image,
  title,
  speaker,
  canBeEvaluated,
}: Props) {
  return (
    <section className="[&:not(:last-child)]:mb-6">
      <Chip
        content={trailName}
        className={`mb-3 ${trailColor} ${trailBgColor}`}
      />

      <div className="flex items-start gap-4">
        <Profile className="shrink-0" image={image} isAvatar />
        <div>
          <h2 className="mb-2 font-crux text-3xl font-semibold  leading-5 text-black">
            {title}
          </h2>
          <h3 className="mb-5 block w-full font-crux text-[24px] leading-3">
            {speaker}
          </h3>
        </div>
      </div>

      <Link to={`/talks/${id}`}>
        <Button
          className="font-crux text-[22px]"
          disabled={!canBeEvaluated}
          full
          primary
          small
        >
          {canBeEvaluated ? "Avaliar" : "Não disponível"}
        </Button>
      </Link>
    </section>
  );
}
