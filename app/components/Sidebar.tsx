
import Select from "~/components/ui/Select";
import Button from "~/components/ui/Button";
import { useRegionStore } from "~/store/useRegionStore";

interface SelectOption {
  value: string;
  label: string;
}
interface SidebarFilterProps {
  provinces: SelectOption[];
  regencies: SelectOption[];
  districts: SelectOption[];
  loading: {
    provinces: boolean;
    regencies: boolean;
    districts: boolean;
  };
}

export default function SidebarFilter({ provinces, regencies, districts, loading }: SidebarFilterProps) {
  const { selected, setSelected, resetSelected } = useRegionStore();

  const handleSelect = (key: string, val: any, options: any[]) => {
     console.log(key)
    const selectedOpt = options.find(opt => String(opt.value) === String(val));
    const nameKey = key === 'provinces' ? 'province_name' : `${key}_name`;
    
    const updates: any = { 
      [key]: val, 
      [nameKey]: selectedOpt?.label || "" 
    };

    if (key === 'provinces') {
      updates.region = ""; updates.region_name = "";
      updates.district = ""; updates.district_name = "";
    } else if (key === 'region') {
      updates.district = ""; updates.district_name = "";
    }

    setSelected(updates);
  };

  return (
    <div className="flex flex-col h-full">
       <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined">language</span>
          </div>
          <span className="text-lg font-bold text-slate-800">Frontend Assessment</span>
        </div>
      <div className="flex-1 space-y-6">
        <h2 className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">
          Filter Wilayah
        </h2>
        
        <Select 
          label="PROVINSI" 
          name="province" 
          icon="map" 
          options={provinces} 
          value={selected.provinces}
          disabled={loading.provinces}
          placeholder="Pilih Provinsi"
          onChange={(val) => handleSelect('provinces', val, provinces)}
        />

        <Select 
          label="KOTA/KABUPATEN"
          name="regency"  
          icon="location_city" 
          options={regencies} 
          value={selected.region}
          disabled={!selected.provinces || loading.regencies}
          placeholder="Pilih Kota/Kabupaten"
          onChange={(val) => handleSelect('region', val, regencies)}
        />

        <Select 
          label="KECAMATAN" 
          icon="distance" 
          name="district" 
          options={districts} 
          value={selected.district}
          disabled={!selected.region || loading.districts}
          placeholder="Pilih Kecamatan"
          onChange={(val) => handleSelect('district', val, districts)}
        />
      </div>

      <div className="mt-auto pt-8 pb-6 border-t border-gray-200">
        <Button
          label="RESET"
          icon="restart_alt"
          variant="softOutline"
          onClick={resetSelected}
        />
      </div>
    </div>
  );
}