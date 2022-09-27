import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  LocationsItemType,
  DeleteLocationItemType,
  UpdateLocationsItemType,
} from './../../../types';
import {
  deleteLocation,
  resetFlag,
  setChosenLocation,
} from './../../../redux/slices/locationsSlice';
import { DeleteOutlined, EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
import EditLocation from './../EditLocation';

export default function LocationsItem({ name, lat, lon, index }: UpdateLocationsItemType) {
  const dispatch = useAppDispatch();
  const realUserLocation = useAppSelector((state) => state.location.realUserLocation);
  const chosenLocation = useAppSelector((state) => state.location.chosenLocation);

  const [showEditWindow, setShowEditWindow] = React.useState<boolean>(false);
  const showUnshowEditWindow = () => setShowEditWindow(!showEditWindow);

  const chooseOtherLocation = ({ name, lat, lon }: LocationsItemType): void => {
    dispatch(setChosenLocation({ name, lat, lon }));
    dispatch(resetFlag());
  };
  const deleteSomeLocation = ({ name, index }: DeleteLocationItemType): void => {
    dispatch(deleteLocation({ name, index }));
  };

  return (
    <li key={index}>
      <div>
        {lat === chosenLocation.lat && lon === chosenLocation.lon ? <EnvironmentOutlined /> : null}{' '}
        <span onClick={() => chooseOtherLocation({ ...{ name, lat, lon } })}>{name}</span>{' '}
        <span>
          <EditOutlined onClick={showUnshowEditWindow} />
        </span>
        {'  '}
        {index !== -1 ? (
          <span onClick={() => deleteSomeLocation({ name, index: index })}>
            <DeleteOutlined />
          </span>
        ) : null}
      </div>

      {showEditWindow ? (
        <EditLocation {...{ index, name, lat, lon, showUnshowEditWindow }} />
      ) : null}
    </li>
  );
}
