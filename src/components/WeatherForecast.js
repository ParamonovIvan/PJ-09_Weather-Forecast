import React from 'react';

import css from "../styles/WeatherForecast.css"

const WeatherForecast = ({ forecastData, formatDate }) => {
  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  const dailyForecast = forecastData.filter((item, index, arr) => {
    const currentDate = new Date(item.dt * 1000).toLocaleDateString();
    const nextDate = index + 1 < arr.length ? new Date(arr[index + 1].dt * 1000).toLocaleDateString() : null;
    return currentDate !== nextDate;
  });

  return (
    <>
    <div className='forecast-box'>
      <div className='forecast-box__cards'>
        {dailyForecast.map((item, index) => (
          <>
          <div className="weather-box__temp-box">
            <p className="temp-box__date">{formatDate(new Date(item.dt * 1000))}</p>
            <p className="temp-box__temperature">{Math.round(item.main.temp)}<span>°C</span></p>
            <p className="temp-box__description">{item.weather[0].description}</p>
            <div><img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" /></div>
          </div>

          <div className="weather-box__details-box">
            <div className="details-box__humidity">
              <div className="details-box__text">
                <span>{item.main.humidity}%</span>
                <p>Humidity</p>
              </div>
            </div>
            <div className="details-box__pressure">
              <div className="details-box__text">
                <span>{item.main.pressure}hPa</span>
                <p>Pressure</p>
              </div>
            </div>
            <div className="details-box__wind">
              <div className="details-box__text">
                <span>{item.wind.speed}m/s</span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
          </>
        ))}
      </div>
    </div>
    </>
  );
};

export default WeatherForecast;
