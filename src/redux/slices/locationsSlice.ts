import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LocationType,
  LocationsItemType,
  UpdateLocationsItemType,
  DeleteLocationItemType,
} from './../../types';

type InitialStateType = {
  locations: LocationsItemType[];
  realUserLocation: LocationsItemType;
  chosenLocation: LocationsItemType;
  errorMessage: string;
  isError: boolean;
  isNewLocation: boolean;
  flag: boolean;
};

const initialState: InitialStateType = {
  locations: [], // Здесь хранятся все геолокации, кроме той, что определена браузером
  realUserLocation: { name: 'Browser geolocation', lat: null, lon: null }, // Здесь хранится геолокация определённа браузером
  chosenLocation: { name: 'Your location', lat: null, lon: null }, // Здксь хранится выбранная геолокация пользователем, по умолчанию будет равна realUserLocation
  errorMessage: '', // сообщение об ошибке при отказе давать доступ к геолокации
  isError: false,
  isNewLocation: false,
  flag: false, // флаг, по которому приложение понимает, что нужно делать ререндер
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
      localStorage.setItem('locations', JSON.stringify(state.locations));
      state.isNewLocation = true;
    },
    setInNewLocation(state) {
      state.isNewLocation = !state.isNewLocation;
    },
    setChosenLocation(state, action: PayloadAction<LocationsItemType>) {
      state.chosenLocation = action.payload;
      state.isError = false;
      localStorage.setItem('chosenLocation', JSON.stringify(state.chosenLocation));
    },
    setRealUserLocation(state, action: PayloadAction<LocationType>) {
      state.realUserLocation.lat = action.payload.lat;
      state.realUserLocation.lon = action.payload.lon;
      state.chosenLocation = state.realUserLocation;
      localStorage.setItem('realUserLocation', JSON.stringify(state.realUserLocation));
    },
    updateRealUserLocation(state, action: PayloadAction<string>) {
      state.realUserLocation.name = action.payload;
      localStorage.setItem('realUserLocation', JSON.stringify(state.realUserLocation));
    },
    updateLocationsItem(state, action: PayloadAction<UpdateLocationsItemType>) {
      state.locations.forEach((location, index) => {
        if (index === action.payload.index) {
          location.lat = action.payload.lat;
          location.lon = action.payload.lon;
          location.name = action.payload.name;
        }
      });
      localStorage.setItem('locations', JSON.stringify(state.locations));
    },
    deleteLocation(state, action: PayloadAction<DeleteLocationItemType>) {
      state.locations = state.locations.filter(
        (location, index) =>
          location.name !== action.payload.name || index !== action.payload.index,
      );
      localStorage.setItem('locations', JSON.stringify(state.locations));
    },
    setError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isError = true;
    },
    unsetError(state, action: PayloadAction) {
      state.errorMessage = '';
      state.isError = false;
    },
    resetFlag(state, action: PayloadAction) {
      state.flag = !state.flag;
    },
    getRealUserLocationFromLS(state, action: PayloadAction<LocationsItemType>) {
      if (action.payload.lat != null && action.payload.lon != null) {
        state.realUserLocation = action.payload;
      }
    },
    getChosenLocationFromLS(state, action: PayloadAction<LocationsItemType>) {
      if (action.payload.lat != null && action.payload.lon != null) {
        state.chosenLocation = action.payload;
      }
    },
    getLocationsFromLS(state, action: PayloadAction<LocationsItemType[]>) {
      if (action.payload.length !== 0) {
        state.locations = action.payload;
      }
    },
  },
});
export const {
  setChosenLocation,
  setLocationsItem,
  setInNewLocation,
  setRealUserLocation,
  updateLocationsItem,
  updateRealUserLocation,
  deleteLocation,
  setError,
  unsetError,
  resetFlag,
  getRealUserLocationFromLS,
  getChosenLocationFromLS,
  getLocationsFromLS,
} = locationsSlice.actions;
export const locationReducer = locationsSlice.reducer;
