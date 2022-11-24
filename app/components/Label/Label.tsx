interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function Label({ className = "", children }: Props) {
  return (
    <label className={`block w-full font-crux text-[24px] ${className}`}>
      {children}
    </label>
  );
}
