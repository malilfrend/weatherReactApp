import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CurrentWeather from './components/currentWeather';
import Header from './components/Header';
import { WeekWeather } from './components/WeekWeather';
import { DayWeather } from './components/DayWeather';
import { fetchWeather } from './redux/slices/currentWeatherSlice';
import {
  setError,
  setRealUserLocation,
  unsetError,
  setInNewLocation,
  getRealUserLocationFromLS,
  getChosenLocationFromLS,
  getLocationsFromLS,
  resetFlag,
} from './redux/slices/locationsSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { Spin, Button } from 'antd';
import './styles/index.scss';
import 'antd/dist/antd.css';
type Position = {
  coords: {
    latitude: number;
    longitude: number;
  };
};
type ErrorType = {
  message: string;
};
function App() {
  const dispatch = useAppDispatch();
  const [indexOfDay, setIndexOfDay] = React.useState<number>(0);
  const realUserLocation = useAppSelector((state) => state.location.realUserLocation);
  const chosenLocation = useAppSelector((state) => state.location.chosenLocation);
  const isLoading = useAppSelector((state) => state.weather.isLoading);
  const isNewLocation = useAppSelector((state) => state.location.isNewLocation);
  const isError = useAppSelector((state) => state.location.isError);
  const error = useAppSelector((state) => state.location.errorMessage);
  const flag = useAppSelector((state) => state.location.flag);

  const setCoord = (position: Position): void => {
    dispatch(
      setRealUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude }),
    );
    dispatch(resetFlag());
  };
  const errorsFunc = (error: ErrorType) => {
    dispatch(setError(error.message));
  };
  const getCoords = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCoord, errorsFunc);
    } else {
      dispatch(setError('Ваш браузер не поддерживает геолокацию'));
    }
  };

  React.useEffect(() => {
    if (!realUserLocation.lat && !realUserLocation.lon) {
      const userData = JSON.parse(localStorage.getItem('realUserLocation') || '');
      dispatch(getRealUserLocationFromLS({ ...userData }));
      const chosenPositionFromLS = JSON.parse(localStorage.getItem('chosenLocation') || '');
      dispatch(getChosenLocationFromLS({ ...chosenPositionFromLS }));
      const locationsFromLS = JSON.parse(localStorage.getItem('locations') || '');
      dispatch(getLocationsFromLS(locationsFromLS));
      dispatch(resetFlag());
    }

    if (!isNewLocation) {
      getCoords();
      if (realUserLocation.lat && realUserLocation.lon) {
        dispatch(fetchWeather({ lat: realUserLocation.lat, lon: realUserLocation.lon }));
      }
    } else {
      dispatch(fetchWeather({ lat: chosenLocation.lat, lon: chosenLocation.lon }));
    }

    dispatch(setInNewLocation());

    return function cleanUp() {
      dispatch(setInNewLocation());
    };
  }, [isError, flag]);

  return (
    <div className="wrapper">
      <Header />
      {error ? (
        <div className={'error'}>
          <p>Сlick on this button after you give the site permission to access geolocation</p>
          <Button type="primary" onClick={() => dispatch(unsetError())}>
            Push to retry get access
          </Button>
          <br />
          <p className={'error_message'}>Type of error: {error}</p>
        </div>
      ) : isLoading ? (
        <div className={'spinner'}>
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <WeekWeather setIndexOfDay={setIndexOfDay} />
          <Routes>
            <Route path={'/'} element={<CurrentWeather />} />
            <Route path={`/forecast/${indexOfDay}`} element={<DayWeather index={indexOfDay} />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
