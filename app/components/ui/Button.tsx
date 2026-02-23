interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: string;
  variant?: 'primary' | 'outline' | 'softOutline';
}

export default function Button({
  label,
  icon,
  variant = 'primary',
  className = "",
  ...props
}: ButtonProps) {

  const baseStyles =
    "inline-flex items-center justify-center gap-2 w-full h-[60px] rounded-2xl font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 active:scale-95";

  const variants = {
    primary:
      "bg-[#2C2C2C] border-2 border-[#2C2C2C] text-white hover:bg-[#4a5568] hover:border-[#4a5568]",

    outline:
      "border-2 border-[#919090] bg-white text-[#919090] hover:bg-[#f8fafc] hover:text-[#2C2C2C] hover:border-[#2C2C2C]",

    softOutline:
      "bg-[#E9EEF5] border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#DBEAFE]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="material-symbols-outlined text-[20px]">
        {icon}
      </span>
      {label}
    </button>
  );
}