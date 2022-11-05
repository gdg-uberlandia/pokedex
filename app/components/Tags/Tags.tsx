interface Props {
  className?: string;
  tags?: string[];
}

export function Tags({ tags = [], className = "" }: Props) {
  return (
    <ul
      className={`flex justify-center gap-2 font-crux text-xl text-[#416FE3] ${className}`}
    >
      {tags.map((tag, key) => (
        <li key={key}>{tag}</li>
      ))}
    </ul>
  );
}
