import { create } from 'zustand';
import { utility } from '~/tools/utility';
import type { SelectedRegion } from '~/types/region';

interface RegionState {
  selected: SelectedRegion;
  setSelected: (data: Partial<SelectedRegion>) => void;
  resetSelected: () => void;
  hydrateSelected: () => void;
}

export const useRegionStore = create<RegionState>((set) => ({
  selected: {
    provinces: "",
    province_name: "",
    region: "",
    region_name: "",
    district: "",
    district_name: ""
  },

  hydrateSelected: () => {
    const provinces = utility.readSession<string>("province_id") || "";
    const province_name = utility.readSession<string>("province_name") || "";
    const region = utility.readSession<string>("region_id") || "";
    const region_name = utility.readSession<string>("region_name") || "";
    const district = utility.readSession<string>("district_id") || "";
    const district_name = utility.readSession<string>("district_name") || "";

    set({
      selected: {
        provinces,
        province_name,
        region,
        region_name,
        district,
        district_name
      }
    });
  },

  setSelected: (data) => set((state) => {
    const newSelected = { ...state.selected, ...data };
    if (data.provinces !== undefined) utility.saveSession("province_id", data.provinces);
    if (data.province_name !== undefined) utility.saveSession("province_name", data.province_name);
    
    if (data.region !== undefined) utility.saveSession("region_id", data.region);
    if (data.region_name !== undefined) utility.saveSession("region_name", data.region_name);
    
    if (data.district !== undefined) utility.saveSession("district_id", data.district);
    if (data.district_name !== undefined) utility.saveSession("district_name", data.district_name);

    return { selected: newSelected };
  }),

  resetSelected: () => {
    const regionKeys = [
      "province_id", "province_name", 
      "region_id", "region_name", 
      "district_id", "district_name"
    ];

    regionKeys.forEach(key => utility.removeSecureItem(key));

    set({
      selected: {
        provinces: "",
        province_name: "",
        region: "",
        region_name: "",
        district: "",
        district_name: ""
      }
    });
  }
}));