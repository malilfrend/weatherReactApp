import { configureStore } from '@reduxjs/toolkit';
import { weatherReducer } from './slices/currentWeatherSlice';
import { locationReducer } from './slices/locationsSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
