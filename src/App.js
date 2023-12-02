import React, { useState } from 'react';
import SearchInput from '../src/components/SearchInput';
import LocationButton from '../src/components/LocationButton';
import SearchButton from '../src/components/SearchButton';
import CurrentWeather from '../src/components/CurrentWeather';
import WeatherForecast from '../src/components/WeatherForecast';

import css from "./styles/App.css";

const api = {
  keyGeo: 'fcdbe9e7473f4ab1bf6290019f9e4cd7',
  keyWeather: 'a75687e18951b979a964830962a1169b',
};

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [widget, setWidget] = useState('current');

  function getMyPosition() {
    if (!navigator.geolocation) {
      alert('The browser does not support geolocation');
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    function onSuccess(position) {
      const { latitude, longitude } = position.coords;

      fetch(`https://api.ipgeolocation.io/timezone?apiKey=${api.keyGeo}&lat=${latitude}&lng=${longitude}`)
        .then(response => response.json())
        .then(json => {
          setCity(json.geo.city);
        });
      if (city !== '')
      requestWeather();
    };

    function onError(error) {
      alert('Location could not be determined');
    };
  };

  const requestWeather = () => {
    if (city === '')
    return alert('Please enter the city name');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api.keyWeather}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setCity('');
      });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api.keyWeather}`)
      .then((res) => res.json())
      .then((result) => {
        setWeatherForecast(result.list);
      });
  };

  const searchEvent = (evt) => {
    if (evt.key === 'Enter') {
      return requestWeather()
    };
  };

  const formatDate = (d) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year}`
  }

  return (
    <div className='container'>
      <div className='container__search-box'>
        <SearchInput city={city} setCity={setCity} onKeyPress={searchEvent} />
        <LocationButton onClick={getMyPosition} />
        <SearchButton onClick={requestWeather} />
      </div>

      {(weather.cod === '404') && (
        <div className="not-found">
          <div className="not-found__img"></div>
          <p>Oops! Invalid location or server error</p>
        </div>
      )}  
    
      {(typeof weather.main !== 'undefined') && (
        <div className="container__weather-box">
          <div className='weather-box__location-box'>
          {(widget === 'current') && (
              <div className='location-box'>
                <div className='location-box__location'>{weather.name}, {weather.sys.country}</div>
                <div className='location-box__date'>Today is {formatDate(new Date())}</div>
              </div>
          )}
          {(widget === 'fiveDays') && (
              <div className='location-box__location'>5-Day Forecast for {weather.name}, {weather.sys.country}</div>
          )}
          </div>
          {(widget === 'current') && <CurrentWeather weather={weather} />}
          {(widget === 'fiveDays') && <WeatherForecast forecastData={weatherForecast} formatDate={formatDate} />}
          <div className='weather-box__buttons-widget'>
            <button
              onClick={() => setWidget('current')}
              className={`buttons-widget ${widget === 'current' ? 'inactive' : 'active'}`}
              >
              Weather Today
            </button>
            <button
              onClick={() => setWidget('fiveDays')}
              className={`buttons-widget ${widget === 'fiveDays' ? 'inactive' : 'active'}`}
              >
              5-Day Forecast
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
