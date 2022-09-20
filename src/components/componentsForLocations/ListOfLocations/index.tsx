import React from 'react';
import { CompassOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../hooks';
import s from './ListOfLocations.module.scss';
import LocationsItem from './LocationsItem';

export default function ListOfLocations() {
  const listsOfLocations = useAppSelector((state) => state.location.locations);
  const realUserLocation = useAppSelector((state) => state.location.realUserLocation);
  const isError = useAppSelector((state) => state.location.isError);

  const [showLocations, setShowLocations] = React.useState<boolean>(false);
  const showLoc = showLocations ? `${s.show}` : '';
  const showUnshowLocations = () => setShowLocations(!showLocations);
  return (
    <div>
      {isError ? null : (
        <div className={s.list_of_locations}>
          <p onClick={showUnshowLocations} className={s.my_location}>
            <CompassOutlined /> My locations
          </p>
          <ul className={s.locations + ' ' + showLoc}>
            <LocationsItem {...{ ...realUserLocation, index: -1, showUnshowLocations }} />
            {listsOfLocations.map((locationItem, index) => {
              return <LocationsItem {...{ ...locationItem, index }} key={index} />;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
