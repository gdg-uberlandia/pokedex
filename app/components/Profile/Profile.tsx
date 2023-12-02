import type { ReactNode } from "react";
import { Image } from "~/components";

interface Props {
  className?: string;
  imgClassName?: string;
  image?: string;
  isAvatar?: boolean;
  name?: string;
  children?: ReactNode;
}

export function Profile({
  className = "",
  imgClassName = "",
  image = "",
  isAvatar = false,
  name = "",
  children,
}: Props) {
  return (
    <figure
      className={`flex grow flex-wrap items-end justify-center ${className}`}
    >
      <Image
        className={`mb-2 w-[90px] ${
          isAvatar && "rounded-full"
        } ${imgClassName}`}
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

      {children}
    </figure>
  );
}
