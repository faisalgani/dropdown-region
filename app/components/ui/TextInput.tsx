interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: string;
}

export default function TextInput({ label, icon, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-bold text-gray-900 ml-1">{label}</label>
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-[#919090] text-[20px]">
          {icon}
        </span>
        <input 
          {...props}
          className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#919090] rounded-xl focus:border-sky-400 focus:ring-0 outline-none transition text-gray-900"
        />
      </div>
    </div>
  );
}