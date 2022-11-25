interface Props {
  className?: string;
  content?: string[];
}

export function Skills({ content = [], className = "" }: Props) {
  return (
    <ul
      className={`flex flex-wrap justify-center gap-x-2 font-crux text-xl leading-none text-[#416FE3] ${className}`}
    >
      {content.map((tag, key) => (
        <li key={key}>#{tag}</li>
      ))}
    </ul>
  );
}
