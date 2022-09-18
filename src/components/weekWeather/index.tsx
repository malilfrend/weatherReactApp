import React from 'react';
import { WeekWeatherItem } from './WeekWeatherItem';
import s from './WeekWeather.module.scss';
import { useAppSelector } from '../../hooks';
type TProps = {
  setIndexOfDay: (index: number) => void;
};
export const WeekWeather: React.FC<TProps> = ({ setIndexOfDay }) => {
  const forecasts = useAppSelector((state) => state.weather.allInfo.forecasts);

  return (
    <div className={s.week_weather__root}>
      {forecasts?.map((obj, index) => {
        return (
          <WeekWeatherItem obj={obj} index={index} key={index} setIndexOfDay={setIndexOfDay} />
        );
      })}
    </div>
  );
};
