interface Props {
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  full?: boolean;
  img?: React.ReactNode;
  primary?: boolean;
  type?: "submit" | "reset" | "button";
}

function setClasses({
  active,
  className = "",
  full,
  hasImg,
  primary,
}: Omit<Props, "children"> & {
  hasImg: boolean;
}) {
  const colorClasses = primary
    ? "bg-white text-black hover:bg-black hover:text-slate-100"
    : "bg-black text-white hover:bg-slate-100 hover:text-black";
  const textClasses = primary
    ? "text-[14px] text-left font-press"
    : "text-[25px] font-crux";
  const activeColorClasses = primary
    ? "bg-black text-white"
    : "bg-white text-black";

  return `
      h-[45px] flex items-center justify-center py-2 px-4 border-2 border-black rounded-md transition-colors
      ${full && "w-full"}
      ${textClasses}
      ${active ? activeColorClasses : colorClasses}
      ${hasImg && "justify-between"}
      ${className}
    `;
}

export function Button({
  active = false,
  children,
  className,
  disabled = false,
  full,
  img,
  primary,
  type = "button",
}: Props) {
  return (
    <button
      className={setClasses({
        active,
        className,
        full,
        hasImg: !!img,
        primary,
      })}
      disabled={disabled}
      type={type}
    >
      {children}
      {img}
    </button>
  );
}
