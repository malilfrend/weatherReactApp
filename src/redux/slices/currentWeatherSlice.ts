import { WeatherService } from './../../api/api';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ForecastItemOutputType, LocationType } from '../../types';
type AllInfoType = {
  fact: {
    condition: string;
    feels_like: number | null;
    humidity: number | null;
    pressure_mm: number | null;
    temp: number | null;
    wind_speed: number | null;
  };
  forecasts: ForecastItemOutputType[];
  geo_object: {
    country: {
      name: string | null;
    };
    locality: {
      name: string | null;
    };
    district: {
      name: string | null;
    };
  };
  info: LocationType;
};
type InitialStateType = {
  allInfo: AllInfoType;
  isLoading: boolean;
};
const initialState: InitialStateType = {
  allInfo: {
    fact: {
      condition: 'sunny',
      feels_like: null,
      humidity: null,
      pressure_mm: null,
      temp: null,
      wind_speed: null,
    },
    forecasts: new Array(7),
    geo_object: {
      country: {
        name: null,
      },
      locality: {
        name: null,
      },
      district: {
        name: null,
      },
    },
    info: {
      lat: null,
      lon: null,
    },
  },
  isLoading: false,
};
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async function (coords: LocationType) {
    const response = await WeatherService.getWeather(coords);
    const everythingFromResponseData = response.data;
    return everythingFromResponseData;
  },
);
export const currentWeatherSlice = createSlice({
  name: 'currentWeatherSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<AllInfoType>) => {
        state.allInfo = action.payload;
        state.isLoading = false;
      });
  },
});

export const weatherReducer = currentWeatherSlice.reducer;
