interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function InputGroup({ children, className = "" }: Props) {
  return (
    <fieldset className={`flex items-end justify-between gap-2 ${className}`}>
      {children}
    </fieldset>
  );
}
