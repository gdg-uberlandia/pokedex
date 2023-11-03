interface Props {
  children?: React.ReactNode;
  title: string;
  className?: string;
}

export function Card({ children, title, className = "" }: Props) {
  return (
    <section className={`mb-12 w-full overflow-hidden rounded-t ${className}`}>
      <h3 className="flex h-9 items-center justify-center border-2 border-black bg-black text-center font-press text-sm font-normal text-white">
        {title}
      </h3>
      <article className="rounded-b border-2 border-black bg-white p-3.5">
        {children}
      </article>
    </section>
  );
}
