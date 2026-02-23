import { useEffect, useState } from "react";
import { useRegionStore } from "~/store/useRegionStore";
import Breadcrumbs from "~/components/Breadcrumbs";
import Sidebar from "~/components/Sidebar";

export default function RegionPage() {
  const {selected } = useRegionStore();
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  const [loading, setLoading] = useState({ 
    provinces: false, 
    regencies: false, 
    districts: false 
  });

  const [isMounted, setIsMounted] = useState(false);
  const { hydrateSelected } = useRegionStore();

  useEffect(() => {
    hydrateSelected();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setLoading(prev => ({ ...prev, provinces: true }));
    fetch("/data/provinces.json")
      .then(res => res.json())
      .then(data => {
        setProvinces(data.map((p: any) => ({ value: p.id, label: p.name })));
      })
      .finally(() => setLoading(prev => ({ ...prev, provinces: false })));
  }, []);


  useEffect(() => {
    if (!selected.provinces) {
      setRegencies([]);
      return;
    }
    setLoading(prev => ({ ...prev, regencies: true }));
    fetch("/data/regencies.json")
      .then(res => res.json())
      .then(data => {
        console.log(data)
         console.log(selected.provinces)
         
        const filtered = data
          .filter((r: any) => String(r.province_id) === String(selected.provinces))
          .map((r: any) => ({ value: r.id, label: r.name }));
          
        setRegencies(filtered);
      })
      .finally(() => setLoading(prev => ({ ...prev, regencies: false })));
  }, [selected.provinces]);


  useEffect(() => {
    if (!selected.region) {
      setDistricts([]);
      return;
    }
    setLoading(prev => ({ ...prev, districts: true }));
    fetch("/data/districts.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter((d: any) => String(d.regency_id) === String(selected.region))
          .map((d: any) => ({ value: d.id, label: d.name }));
        setDistricts(filtered);
      })
      .finally(() => setLoading(prev => ({ ...prev, districts: false })));
  }, [selected.region]);

  if (!isMounted) return null;


  return (
    <div className="flex min-h-screen bg-[#FBFBFB] font-sans">
      
      <aside className="w-[320px] fixed h-screen bg-white border-r border-gray-100 p-8 z-30">
          <Sidebar
            provinces={provinces}
            regencies={regencies}
            districts={districts}
            loading={loading}
          />
      </aside>

     
      <main className="flex-1 ml-[320px] flex flex-col">
        <Breadcrumbs 
          province={selected.province_name}
          region={selected.region_name}
          district={selected.district_name}
        />

        <section className="flex-1 flex flex-col items-center justify-center p-12 gap-8">
          <DisplayItem label="PROVINSI" value={selected.province_name} />
          <ArrowSeparator active={!!selected.region_name} />
          <DisplayItem label="KOTA / KABUPATEN" value={selected.region_name} />
          <ArrowSeparator active={!!selected.district_name} />
          <DisplayItem label="KECAMATAN" value={selected.district_name} />
        </section>
      </main>
    </div>
  );
}

function DisplayItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center group transition-all duration-500">
      <p className="text-[10px] font-black text-blue-400 tracking-[0.4em] uppercase mb-4 opacity-70 group-hover:opacity-100">
        {label}
      </p>
      <h1 className={`text-6xl font-black transition-all duration-500 ${value ? 'text-[#1A202C] scale-100' : 'text-gray-100 scale-95'}`}>
        {value || "—"}
      </h1>
    </div>
  );
}

function ArrowSeparator({ active }: { active: boolean }) {
  return (
    <div className={`transition-all duration-700 ${active ? 'text-blue-200 opacity-100 translate-y-0' : 'text-gray-100 opacity-30 -translate-y-2'}`}>
      <span className="material-symbols-outlined text-4xl leading-none">south</span>
    </div>
  );
}