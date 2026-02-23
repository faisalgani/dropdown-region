interface BreadcrumbsProps {
  province?: string;
  region?: string;
  district?: string;
}

export default function Breadcrumbs({ province, region, district }: BreadcrumbsProps) {
  return (
    <header className="breadcrumb h-20 border-b border-gray-50 flex items-center px-12 bg-white/40 backdrop-blur-md sticky top-0 z-20">
      <div className="text-[11px] font-medium text-gray-400 flex items-center gap-2 tracking-wide uppercase">
        <span className="hover:text-gray-600 cursor-default transition-colors">Indonesia</span>
        
        {province && (
          <>
            <span className="text-gray-300 text-[14px]">/</span> 
            <span className="hover:text-gray-600 cursor-default transition-colors">{province}</span>
          </>
        )}
        
        {region && (
          <>
            <span className="text-gray-300 text-[14px]">/</span> 
            <span className="hover:text-gray-600 cursor-default transition-colors">{region}</span>
          </>
        )}
        
        {district && (
          <>
            <span className="text-gray-300 text-[14px]">/</span> 
            <span className="text-blue-500 font-bold">{district}</span>
          </>
        )}
      </div>
    </header>
  );
}