import { useState, useRef, useEffect, useMemo } from "react";

interface SelectProps<T> {
  label: string;
  icon: string;
  options: T[];
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  name: string 
}

export default function Select<T extends { value: string | number; label: string }>({ 
  label, icon, options, placeholder, disabled, value,name, onChange 
}: SelectProps<T>) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedLabel = options.find((opt) => String(opt.value) === String(value))?.label;

  // filtering
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options; 
    return options.filter((opt) =>
      String(opt.label).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchTerm(""); 
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col gap-2 w-full ${disabled ? 'opacity-80' : ''}`} ref={containerRef}>
      <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
      <input type="hidden" name={name} value={value} />
      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`relative w-full h-[52px] pl-11 pr-10 bg-white border-2 rounded-xl flex items-center cursor-pointer transition-all
            ${isOpen ? 'border-[#2C2C2C] ring-4 ring-gray-50' : 'border-[#919090]'}
            ${disabled ? 'cursor-not-allowed bg-gray-50' : 'hover:border-[#2C2C2C]'}
          `}
        >
          <span className="material-symbols-outlined absolute left-3 text-[24px] text-[#919090]">
            {icon}
          </span>

          <span className={`text-[15px] truncate ${!selectedLabel ? 'text-gray-400' : 'text-gray-900'}`}>
            {disabled && !selectedLabel ? "Memuat..." : (selectedLabel || placeholder)}
          </span>

          <div className="absolute right-3 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#919090] transition-transform"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                expand_more
              </span>
          </div>
        </div>


        {isOpen && (
          <div className="absolute left-0 right-0 z-[9999] mt-2 bg-white border-2 border-[#2C2C2C] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
             <div className="p-3 border-b border-gray-100 bg-gray-50">
               <div className="relative flex items-center">
                 <span className="material-symbols-outlined absolute left-3 text-[20px] text-gray-400">search</span>
                 <input
                   ref={searchInputRef}
                   type="text"
                   className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-[15px] text-gray-900 focus:outline-none focus:border-[#2C2C2C]"
                   placeholder="Cari..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   onKeyDown={(e) => e.stopPropagation()} 
                   onClick={(e) => e.stopPropagation()}
                 />
               </div>
             </div>

             <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
               {filteredOptions.length > 0 ? (
                 filteredOptions.map((opt, index) => (
                   <div
                     key={`${opt.value}-${index}`}
                     onClick={() => {
                       onChange(opt.value);
                       setIsOpen(false);
                     }}
                     className={`px-5 py-3.5 text-[15px] text-gray-900 cursor-pointer transition-colors border-b border-gray-50 last:border-0
                       ${String(value) === String(opt.value) ? 'bg-blue-50 font-bold text-blue-600' : 'hover:bg-gray-50'}
                     `}
                   >
                     {opt.label}
                   </div>
                 ))
               ) : (
                 <div className="px-5 py-8 text-sm text-gray-500 text-center italic">
                   {searchTerm ? `"${searchTerm}" tidak ditemukan` : "Data tidak tersedia"}
                 </div>
               )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}