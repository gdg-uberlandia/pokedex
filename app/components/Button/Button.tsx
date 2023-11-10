import type { MouseEventHandler } from "react";

interface Props {
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  full?: boolean;
  img?: React.ReactNode;
  name?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  primary?: boolean;
  type?: "submit" | "reset" | "button";
  value?: string;
  small?: boolean;
}

function setClasses({
  active,
  className = "",
  disabled,
  full,
  hasImg,
  primary,
  small,
}: Omit<Props, "children" | "onClick"> & {
  hasImg: boolean;
}) {
  const colorClasses = primary
    ? "bg-white text-black hover:bg-black hover:text-slate-50"
    : "bg-black text-white hover:bg-slate-50 hover:text-black";
  const textClasses = primary
    ? "text-[14px] text-left font-press"
    : "text-[25px] font-crux";
  const activeColorClasses = primary
    ? "bg-black text-white"
    : "bg-white text-black";
  const disabledColorClasses =
    "bg-white text-black opacity-50 cursor-not-allowed hover:bg-white hover:text-black";

  return `
      flex items-center justify-center py-2 px-4 border-2 border-black rounded-[10px] transition-colors
      ${full && "w-full"}
      ${small ? "h-[30px] text-[25px] font-crux" : "h-[45px]"}
      ${textClasses}
      ${
        disabled
          ? disabledColorClasses
          : active
          ? activeColorClasses
          : colorClasses
      }
      ${hasImg && "justify-between"}
      ${className}
    `;
}

export function Button({
  onClick = () => {},
  active = false,
  children,
  className,
  disabled = false,
  full,
  img,
  name,
  primary,
  small = false,
  type = "button",
  value,
}: Props) {
  return (
    <button
      className={setClasses({
        active,
        className,
        disabled,
        full,
        hasImg: !!img,
        primary,
        small,
      })}
      disabled={disabled}
      name={name}
      onClick={onClick}
      type={type}
      value={value}
    >
      {children}
      {img}
    </button>
  );
}
