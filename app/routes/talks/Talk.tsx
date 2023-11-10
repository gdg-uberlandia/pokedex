import { Chip, Profile } from "~/components";

interface Props {
  trailName?: string;
  trailColor: string;
  trailBgColor: string;
  image: string;
  title: string;
  speaker: string;
  children?: React.ReactNode;
}

function Talk({
  trailName = "",
  trailBgColor,
  trailColor,
  image,
  title,
  speaker,
  children,
}: Props) {
  return (
    <section className="[&:not(:last-child)]:mb-6">
      {trailName && (
        <Chip
          content={trailName}
          className={`mb-3 ${trailColor} ${trailBgColor}`}
        />
      )}

      <div className="flex items-start gap-4">
        <Profile className="shrink-0" image={image} isAvatar />
        <div>
          <h2 className="mb-1 font-sans text-base leading-4 text-black">
            {title}
          </h2>
          <h3 className="mb-5 block w-full font-sans text-sm font-medium text-stone-400">
            {speaker}
          </h3>
        </div>
      </div>

      {children}
    </section>
  );
}

export { Talk };
