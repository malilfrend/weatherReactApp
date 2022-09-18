import { WeatherService } from './../../api/api';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type LocationType = {
  lat: number | null;
  lon: number | null;
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

type InitialStateType = {
  allInfo: {
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
export const fetchWeather = createAsyncThunk<typeof initialState.allInfo>(
  'weather/fetchWeather',
  async function () {
    const response = await WeatherService.getWeather();
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
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.allInfo = action.payload;
        state.isLoading = false;
      });
  },
});

export const weatherReducer = currentWeatherSlice.reducer;
