interface Props {
  children?: React.ReactNode;
  title: string;
  className?: string;
}

export function Card ({ children, title, className = '' }: Props) {
  return (
    <section className={`w-full overflow-hidden bg-white rounded-t ${className}`}>
      <h3 className="flex h-9 items-center justify-center border-2 border-black bg-black font-press text-center text-sm font-normal text-white">
        {title}
      </h3>

      <div className="p-3.5 border-2 border-black rounded-b">{children}</div>
    </section>
  );
}
