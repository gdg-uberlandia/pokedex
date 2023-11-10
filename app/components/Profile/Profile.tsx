import { Image } from "~/components";

interface Props {
  className?: string;
  image?: string;
  isAvatar?: boolean;
  name?: string;
}

export function Profile({
  className = "",
  image = "",
  isAvatar = false,
  name = "",
}: Props) {
  return (
    <figure
      className={`flex grow flex-wrap items-end justify-center ${className}`}
    >
      <Image
        className={`mb-2 w-[90px] ${isAvatar && "rounded-full"}`}
        src={image}
        alt={name}
      />

      {name && (
        <figcaption className="w-full">
          <h1 className="text-center font-press text-xs font-normal text-black">
            {name}
          </h1>
        </figcaption>
      )}
    </figure>
  );
}
