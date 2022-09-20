import axios, { AxiosResponse } from 'axios';
import { LocationType } from './../types';
const instance = axios.create({
  withCredentials: false,
  baseURL: 'http://localhost:8010/proxy/v2/forecast', // 'https://api.weather.yandex.ru/v2/forecast'
  headers: {
    'X-Yandex-API-Key': `${process.env.REACT_APP_X_YANDEX_API_KEY}`,
  },
});

export const WeatherService = {
  getWeather(coords: LocationType): Promise<AxiosResponse> {
    return instance.get(`?lat=${coords.lat}&lon=${coords.lon}&lang=en_US&hours=false&extra=false`);
  },
};
