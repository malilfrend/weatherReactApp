import React from 'react';
import s from './CurrentWeather.module.scss';
import ThisDay from './thisDay';
import ThisDayInfo from './thisDayInfo';

export default function CurrentWeather() {
  return (
    <div className={s.home}>
      <main className={s.wrapper}>
        <ThisDay />
        <ThisDayInfo />
      </main>
    </div>
  );
}
