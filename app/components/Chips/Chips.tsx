import { Chip } from "./";

interface Props {
  className?: string;
  chips?: Array<{
    content: string;
    color: string;
  }>;
}

export function Chips({ chips = [], className = "" }: Props) {
  return (
    <ul className={`flex flex-wrap gap-x-2 ${className}`}>
      {chips.map(({ content }, key) => (
        <Chip key={key} content={content} />
      ))}
    </ul>
  );
}
