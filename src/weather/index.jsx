import React, { useState, useEffect } from "react";
import Search from "../search";
import Sched from "../img/schedule.png";
import Temp from "../img/temp.png";
import Cloud from "../img/clouds.png";
import Sun from "../img/sun.png";
import Moon from "../img/moon.png";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=feb7e05a362a43d57cc960296ef803f2`
      );
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  }

  function getCurrentHour() {
    return new Date().getHours();
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  useEffect(() => {
    fetchWeatherData("Manila");
  }, []);

  console.log(weatherData);
  return (
    <div className="container">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="weather-page">
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          {getCurrentHour() < 10 ? (
            <img src={Moon} className="day-display" />
          ) : (
            <img src={Sun} className="day-display" />
          )}
          <div className="date">
            <div className="date-info">
              <img src={Sched} className="images" />
              <span>{getCurrentDate()}</span>
            </div>
          </div>

          <div className="temp-descrip">
            <div className="temp-info">
              <img src={Temp} className="images" />
              {weatherData?.main?.temp}&deg;
            </div>
            <p className="description">
              <img src={Cloud} className="images" />
              {weatherData && weatherData.weather && weatherData.weather[0]
                ? weatherData.weather[0].description
                : ""}
            </p>
          </div>
          <div className="weather-info">
            <div>
              <div className="w-info">
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p className="w-info-text">Wind Speed</p>
              </div>
            </div>
            <div>
              <div className="w-info">
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p className="w-info-text">Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
