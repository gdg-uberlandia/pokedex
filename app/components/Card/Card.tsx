interface Props {
  children?: React.ReactNode;
  title: string;
  className?: string;
  style?: any;
}

export function Card({ children, title, style, className = "" }: Props) {
  return (
    <section style={style} className={`w-full overflow-hidden rounded-t ${className}`}>
      <h3 className="flex h-9 items-center justify-center border-2 border-black bg-black text-center font-press text-sm font-normal text-white">
        {title}
      </h3>
      <div className="rounded-b border-2 border-black bg-white p-3.5">
        {children}
      </div>
    </section>
  );
}
