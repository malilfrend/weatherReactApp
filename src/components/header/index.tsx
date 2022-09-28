import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import LogoComponent from './../Common/LogoComponent';
import s from './Header.module.scss';
const SaveLocation = lazy(() => import('./../ComponentsForLocations/SaveLocation'));
const ListOfLocations = lazy(() => import('./../ComponentsForLocations/ListOfLocations'));

export default function Header() {
  return (
    <header className={s.header}>
      <Link to="/">
        <div className={s.wrapper}>
          <div className={s.logo}>
            <LogoComponent />
          </div>
          <div className={s.title}>Weather</div>
        </div>
      </Link>

      <div className={s.location_info}>
        <Suspense>
          <ListOfLocations />
          <SaveLocation />
        </Suspense>
      </div>
    </header>
  );
}
