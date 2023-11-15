interface Props {
  className?: string;
  content?: string;
}

export function Chip({ className = "", content = "" }: Props) {
  return (
    <li
      className={`inline-block list-none rounded border-2 border-black px-0.5 font-crux text-[18px] leading-[17px] ${className}`}
    >
      {content}
    </li>
  );
}
