import React from 'react';
import { useAppSelector } from '../../../hooks';
import cloud from './../../../assets/images/cloud.png';
import s from './ThisDayInfo.module.scss';

export default function ThisDayInfo() {
  const thisDayInformation = useAppSelector((state) => state?.weather?.allInfo);
  const thisDayWeather = thisDayInformation?.fact;
  return (
    <div className={s.this__day_info}>
      <div className={s.this__day_info_items}>
        <p>Feels like: {thisDayWeather?.feels_like}°С</p>
        <p>Condition: {thisDayWeather?.condition}</p>
        <p>Wind speed: {thisDayWeather?.wind_speed} m/s </p>
        <p>Pressure: {thisDayWeather?.pressure_mm} mm.rt.st</p>
        <p>Humidity: {thisDayWeather?.humidity} %</p>
        <p>
          Coordinates: latitude: {thisDayInformation?.info?.lat} longitude:
          {thisDayInformation?.info?.lon}
        </p>
      </div>
    </div>
  );
}
