import { ReactNode } from "react";

interface ListItemProps {
  title: string;
  description: string;
  Icon: ReactNode;
}

export const ListItem = ({ title, description, Icon }: ListItemProps) => {
  return (
    <section className="flex items-center gap-3 px-2">
      {Icon}

      <article className="mt-2">
        <h3 className="font-press text-xs font-bold">{title}</h3>
        <p className="font-crux text-lg font-medium leading-4">{description}</p>
      </article>
    </section>
  );
};
