import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationType } from './currentWeatherSlice';

type LocationsItemType = {
  name: string;
  lat: number;
  lon: number;
};
type InitialStateType = {
  locations: LocationsItemType[];
  realUserLocation: LocationsItemType | null;
  currentLocation: LocationType | null;
  errorMessage: string;
  isError: boolean;
};
const initialState: InitialStateType = {
  locations: [],
  realUserLocation: null,
  currentLocation: null,
  errorMessage: '',
  isError: false,
};
export const locationsSlice = createSlice({
  name: 'locationSlice',
  initialState,
  reducers: {
    setLocationsItem(state, action: PayloadAction<LocationsItemType>) {
      state.locations.push({
        name: action.payload.name,
        lat: action.payload.lat,
        lon: action.payload.lon,
      });
    },
    setCurrentLocation(state, action: PayloadAction<LocationType>) {
      state.currentLocation = action.payload;
      state.isError = false;
    },
    setRealUserLocation(state, action: PayloadAction<LocationsItemType>) {
      state.realUserLocation = action.payload;
    },
    deleteLocation(state, action: PayloadAction<string>) {
      state.locations = state.locations.filter((location) => location.name !== action.payload);
    },
    setError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isError = true;
    },
    unsetError(state, action: PayloadAction) {
      state.errorMessage = '';
      state.isError = false;
    },
  },
});
export const {
  setCurrentLocation,
  setLocationsItem,
  setRealUserLocation,
  deleteLocation,
  setError,
  unsetError,
} = locationsSlice.actions;
export const locationReducer = locationsSlice.reducer;
