interface CardProps {
  title: string;
  description?: string;
  lastUpdate?: string;
}

export default function Card({ title, description,lastUpdate }: CardProps) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-500 text-sm leading-relaxed">
        {description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
      </p>
      
        {lastUpdate && (
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {lastUpdate}
          </div>
        )}
    </div>
  );
}