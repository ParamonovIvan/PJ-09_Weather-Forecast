import React from 'react';

import css from "../styles/CurrentWeather.css"


const CurrentWeather = ({ weather, formatDate }) => {

  const timeConverter = (UNIX_timestamp) => {
    let time = new Date(UNIX_timestamp * 1000).toLocaleTimeString("en-US");
    return time;
  }

  return (
    <>
    <div className="weather-box__temp-box">
      <p className="temp-box__temperature">{Math.round(weather.main.temp)}<span>°C</span></p>
      <p className="temp-box__description">{weather.weather[0].description}</p>
      <div id="icon"><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" /></div>
    </div>

    <div className="weather-box__details-box">
      <div className="details-box__humidity">
        <div className="details-box__text">
          <span>{weather.main.humidity}%</span>
          <p>Humidity</p>
        </div>
      </div>
      <div className="details-box__pressure">
        <div className="details-box__text">
          <span>{weather.main.pressure}hPa</span>
          <p>Pressure</p>
        </div>
      </div>
      <div className="details-box__wind">
        <div className="details-box__text">
          <span>{weather.wind.speed}m/s</span>
          <p>Wind Speed</p>
        </div>
      </div>
      <div className="details-box__sunrise">
        <div className="details-box__text">
          <span>{timeConverter(weather.sys.sunrise)}</span>
          <p>Sunrise</p>
        </div>
      </div>
      <div className="details-box__sunset">
        <div className="details-box__text">
          <span>{timeConverter(weather.sys.sunset)}</span>
          <p>Sunset</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CurrentWeather;
