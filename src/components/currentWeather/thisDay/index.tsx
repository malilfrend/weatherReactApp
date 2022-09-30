import React from 'react';
import { useAppSelector } from '../../../hooks';

import s from './ThisDay.module.scss';

export default function ThisDay() {
  const temp = useAppSelector((state) => state?.weather?.allInfo?.fact?.temp);
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let time = `${hours}:${(minutes + '').length === 1 ? `0${minutes}` : minutes}`;

  const location = useAppSelector((state) => state?.weather?.allInfo?.geo_object);
  return (
    <div className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.top__block_wrapper}>
          <div className={s.this__temp}>{temp}°</div>
          <div className={s.this__day_name}>Today</div>
        </div>
      </div>
      <div className={s.bottom__block}>
        <div className={s.this__time}>
          Local time: <time>{time}</time>
        </div>
        <div className={s.this__location}>
          {location?.country === null ? 'Unknown location' : null}
          <p>{location?.country?.name}</p>
          <p>{location?.locality?.name}</p>
          <p>{location?.district?.name}</p>
        </div>
      </div>
    </div>
  );
}
