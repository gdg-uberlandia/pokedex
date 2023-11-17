import { Chip, Profile } from "~/components";

interface Props {
  children?: React.ReactNode;
  name?: string;
  path: {
    label?: string;
    bgColor?: string;
    color?: string;
  };
  photo?: string;
  topic: string;
}

function Talk({
  children,
  name = "",
  path: { label = "", bgColor = "", color = "" },
  photo = "",
  topic,
}: Props) {
  return (
    <section className="[&:not(:last-child)]:mb-6">
      {label && <Chip content={label} className={`mb-3 ${color} ${bgColor}`} />}

      <div className="flex items-start gap-4">
        <Profile className="w-1/3" image={photo} isAvatar />
        <div className="w-2/3">
          <h2 className="mb-1 font-sans text-base leading-4 text-black">
            {topic}
          </h2>
          <h3 className="mb-5 block w-full font-sans text-sm font-medium text-black/40">
            {name}
          </h3>
        </div>
      </div>

      {children}
    </section>
  );
}

export { Talk };
