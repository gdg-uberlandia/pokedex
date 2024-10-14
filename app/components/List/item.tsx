import clsx from "clsx";
import { ReactNode } from "react";

interface ListItemProps {
  title: string;
  description: string;
  Icon: ReactNode;
  selected: boolean;
  index: number;
}

function generateColor() {
  const colors = [
    "text-devfest-blue",
    "text-devfest-red",
    "text-devfest-orange",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

export const ListItem = ({
  title,
  description,
  Icon,
  selected,
  index,
}: ListItemProps) => {
  return (
    <section className="relative">
      <div
        className={clsx(
          "flex items-center gap-3 px-4 py-2",
          selected && "opacity-60 blur-sm",
          index % 2 === 0 && "bg-slate-100"
        )}
      >
        {Icon}

        <article className="mt-2">
          <h3 className="font-press text-xs font-bold">{title}</h3>
          <p className="font-crux text-lg font-medium leading-4">
            {description}
          </p>
        </article>
      </div>

      {selected && (
        <p
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-crux text-2xl font-extrabold",
            generateColor()
          )}
        >
          Cumprida
        </p>
      )}
    </section>
  );
};
