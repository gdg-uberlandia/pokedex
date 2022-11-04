interface Props {
  children?: React.ReactNode;
  full?: boolean;
  primary?: boolean;
  className?: string;
  img?: React.ReactNode;
  type?: "submit" | "reset" | "button";
}

type SetClassesParams = Omit<Props, 'children'> & {
  hasImg: boolean;
}

function setClasses ({ primary, full, className = "", hasImg } : SetClassesParams) {
  const colorClasses = primary ?
    "bg-white text-[14px] text-black text-left border-2 border-black font-press" :
    "bg-black text-[25px] text-white font-crux"

    return `
      h-[45px] rounded-md py-2 px-4
      ${full && "w-full"}
      ${colorClasses}
      ${hasImg && 'flex justify-between items-center'}
      ${className}
    `;
}

export function Button({ children, full, primary, className, img, type = "button" }: Props) {
  return (
    <button
      className={setClasses({ primary, full, className, hasImg: !!img})}
      type={type}
    >
      {children}
      {img}
    </button>
  );
}
