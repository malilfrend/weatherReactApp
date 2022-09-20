import React from 'react';
import { Link } from 'react-router-dom';
import s from './WeekWeather.module.scss';
import { ForecastItemOutputType } from './../../types';
type TProps = {
  obj: ForecastItemOutputType;
  index: number;
  setIndexOfDay: (index: number) => void;
};
export const WeekWeatherItem: React.FC<TProps> = ({ obj, index, setIndexOfDay }) => {
  const aboutWeather = obj.parts.day;
  const day = new Date(obj.date_ts * 1000).getUTCDate() + 1;
  const month = new Date(obj.date_ts * 1000).getUTCMonth() + 1;
  return (
    <Link to={`/forecast/${index}`} onClick={() => setIndexOfDay(index)}>
      <div className={s.week_weather__item}>
        <div className={s.main_info}>
          <div className={s.date}>
            <h3>{index === 0 ? 'Today' : `${day} / ${month}`}</h3>
          </div>
          <section className={s.temp}>
            <span className={s.temp_max}>{aboutWeather.temp_max}°</span>...
            <span className={s.temp_min}> {aboutWeather.temp_min}°</span>
          </section>
          <section className={s.condition}>
            <p>{aboutWeather.condition}</p>
          </section>
        </div>
      </div>
    </Link>
  );
};
