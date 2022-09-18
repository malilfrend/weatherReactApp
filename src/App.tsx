import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CurrentWeather from './components/currentWeather';
import Header from './components/header';
import { WeekWeather } from './components/weekWeather';
import { DayWeather } from './components/dayWeather';
import './styles/index.scss';
import { fetchWeather } from './redux/slices/currentWeatherSlice';
import {
  setCurrentLocation,
  setError,
  setRealUserLocation,
  unsetError,
} from './redux/slices/locationsSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { Spin } from 'antd';
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

  const showCoord = (position: Position): void => {
    dispatch(setCurrentLocation({ lat: position.coords.latitude, lon: position.coords.longitude }));
  };
  const errorsFunc = (error: ErrorType) => {
    dispatch(setError(error.message));
  };
  const getCoords = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showCoord, errorsFunc);
    } else {
      dispatch(setError('Ваш браузер не поддерживает геолокацию'));
    }
  };

  const isLoading = useAppSelector((state) => state.weather.isLoading);
  // const location = useAppSelector((state) => state.location.currentLocation);
  const error = useAppSelector((state) => state.location.errorMessage);
  const isError = useAppSelector((state) => state.location.isError);
  console.log(error);

  React.useEffect(() => {
    getCoords();
    dispatch(fetchWeather());
  }, [isError]);

  return (
    <div className="wrapper">
      <Header />

      {isLoading ? (
        <div className={'spinner'}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className={'error'}>
          <p>Сlick on this button after you give the site permission to access geolocation</p>
          <button onClick={() => dispatch(unsetError())}>Жмяк</button>
          {error}
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
