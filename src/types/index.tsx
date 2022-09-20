export type DeleteLocationItemType = { name: string; index: number };

export type UpdateLocationsItemType = {
  name: string;
  lat: number | null;
  lon: number | null;
  index: number;
};
export type LocationType = {
  lat: number | null;
  lon: number | null;
};
export type LocationsItemType = {
  name: string;
  lat: number | null;
  lon: number | null;
};
export type PropsInLocationsComponent = {
  name: string;
  lat: number | null;
  lon: number | null;
  index: number;
  showUnshowEditWindow: () => void;
};
export type ForecastItemOutputType = {
  date_ts: number;
  parts: {
    day: {
      condition: string;
      feels_like: number;
      humidity: number;
      pressure_mm: number;
      temp_avg: number;
      temp_max: number;
      temp_min: number;
      wind_speed: number;
    };
  };
};
