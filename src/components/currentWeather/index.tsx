import React from 'react';
import s from './CurrentWeather.module.scss';
import ThisDay from './ThisDay';
import ThisDayInfo from './ThisDayInfo';

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
