import React, { useState } from "react";

import "./App.css";
const api = {
  key: "0bab7dd1bacc418689b143833220304",
  base: "https://api.weatherapi.com/v1/current.json",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const search = (event) => {
    setWeather({});
    setError("");
    if (event.key === "Enter") {
      fetch(`${api.base}?key=${api.key}&q=${query}`)
        .then((response) => {
          // if (response.ok) {
          return response.json();
        })
        // throw new Error("Location not Found!");

        .then((actualData) => {
          debugger;
          console.log(actualData);

          if (actualData.error) {
            throw new Error(actualData.error.message);
          }

          setWeather(actualData);
        })
        .catch((error) => {
          console.log(error);
          // if (Object.keys(weather).length == 0) {
          debugger;
          if (error.toString() == "Error: Parameter q is missing.") {
            setError("Location can't be Empty");
          } else {
            setError(error.toString());
          }

          // } else {
          //   setError(error + " ");
          // }
        });
    }
  };

  const dateBuilder = (d) => {
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
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className="App"
      id={
        Object.keys(weather).length &&
        weather.current.condition.text.toLowerCase().includes("rain")
          ? "rainy"
          : Object.keys(weather).length &&
            weather.current.condition.text.toLowerCase().includes("cloud")
          ? "cloudy"
          : Object.keys(weather).length &&
            weather.current.condition.text.toLowerCase().includes("mist")
          ? "mist"
          : "sunny"
      }
    >
      <div className="main">
        {/* SEARCH  */}
        <div className="search-box">
          <input
            type="text"
            id="search-bar"
            placeholder="Search.."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyPress={search}
          />
        </div>
        <div>
          <p id="error">{error}</p>
        </div>
        {/* CITY & DATE  */}
        {Object.keys(weather).length ? (
          <>
            <div className="location-box">
              <div className="location-city">
                {weather.location.name} ,{weather.location.country}
              </div>
              <div className="location-date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{weather.current.temp_c}&#176; C</div>
              <div className="weather">{weather.current.condition.text}</div>
            </div>
            <div className="allValues-box">
              <div className="cloud value">
                <p>Cloud</p>
                <p>{weather.current.cloud}%</p>
              </div>
              <div className="value">|</div>
              <div className="humidity value">
                <p>Humidity</p>
                <p>{weather.current.humidity}%</p>
              </div>
              <div className="value">|</div>
              <div className="wind value">
                <p>Wind</p>
                <p>{weather.current.wind_kph}km/h</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
