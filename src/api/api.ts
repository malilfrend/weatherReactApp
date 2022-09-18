import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  withCredentials: false,
  baseURL: 'http://localhost:8010/proxy/v2/forecast', // 'https://api.weather.yandex.ru/v2/forecast'
  headers: {
    'X-Yandex-API-Key': '3b2c1beb-9a5e-450c-b45c-e42abdf12ec4',
  },
});

export const WeatherService = {
  getWeather(): Promise<AxiosResponse<any, any>> {
    return instance.get(`?lat=59.8706268&lon=30.3092315&lang=en_US&hours=false&extra=false`);
  },
};
