export interface SelectedRegion {
  provinces: string;
  province_name: string; 
  region: string;
  region_name: string;
  district: string;
  district_name: string;
}

export interface RegionOption {
  value: string | number;
  label: string;
}

export interface RegionLoading {
  provinces: boolean;
  region: boolean;
  district: boolean;
}