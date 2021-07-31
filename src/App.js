import React, { useState } from "react";

function App() {
  // States
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const api_key = "283424de01c0528f18d7c3d3e6e3cdbc";

  const dateBuilder = (d) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}`
      )
        .then((respone) => respone.json())

        .then((result) => {
          setWeather(result);
          setCity("");
          console.log(result);
        });
    }
  };

  const kelvinToCelsius = (k) => {
    return k - 273.15;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? Math.round(kelvinToCelsius(weather.main.temp)) > 20
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(event) => setCity(event.target.value)}
            value={city}
            onKeyPress={search}
          ></input>
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(kelvinToCelsius(weather.main.temp))}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="not-found">{weather.message}</div>
        )}
      </main>
    </div>
  );
}

export default App;
