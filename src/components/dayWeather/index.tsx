import React from 'react';
import s from './DayWeather.module.scss';
import { useAppSelector } from '../../hooks';
type TProps = {
  index: number;
};
export const DayWeather: React.FC<TProps> = ({ index }) => {
  const forecasts = useAppSelector((state) => state.weather.allInfo.forecasts);
  const dayWeather = forecasts[index]?.parts?.day;
  const date = forecasts[index]?.date_ts;
  const day = new Date(date * 1000).getUTCDate() + 1;
  const month = new Date(date * 1000).getUTCMonth() + 1;

  return (
    <div className={s.day_weather}>
      <h2>More information</h2>
      <div className={s.day_weather__wrapper}>
        <div className={s.main_info}>
          <div className={s.week_weather__item}>
            <div className={s.main_info}>
              <h3 className={s.date}>{index === 0 ? 'Today' : `${day} / ${month}`}</h3>
              <section className={s.temp}>
                <span className={s.temp_max}>{dayWeather?.temp_max}°</span>...
                <span className={s.temp_min}> {dayWeather?.temp_min}°</span>
              </section>
            </div>
          </div>
        </div>
        <div className={s.moreInfo}>
          <p>
            Average temperature: {dayWeather?.temp_avg}°{' '}
            <span>(feels like: {dayWeather?.feels_like}°)</span>
          </p>
          <p>Condition: {dayWeather?.condition}</p>
          <p>Wind speed: {dayWeather?.wind_speed} m/s</p>
          <p>Pressure: {dayWeather?.pressure_mm} mm.rt.st</p>
          <p>Humidity: {dayWeather?.humidity} %</p>
        </div>
      </div>
    </div>
  );
};
