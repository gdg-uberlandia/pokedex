interface Props {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
  type?: "text" | "hidden";
}

export function Input({
  className = "",
  defaultValue,
  disabled = false,
  name,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  value,
}: Props) {
  return (
    <input
      className={`flex h-[30px] w-full items-center justify-center rounded-md border-2 border-black bg-white px-2 font-crux text-[22px] text-black transition-colors ${className}`}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  );
}
