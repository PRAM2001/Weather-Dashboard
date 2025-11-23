
import React, { useEffect, useState } from "react";
import "./weather.css"; 

const API_KEY = "87bb4aea1bfcef4181acc2c65a66de68"; 
const CITY = "Bengaluru"; 

function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeather(data);

      document.title = `Weather Dashboard`;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(fetchWeather, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="weather-container">
      <h1>🌤 Weather Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <>
          <h2>{weather.name}</h2>

          <div className="temp">{weather.main.temp}°C</div>

          <p className="description">{weather.weather[0].description}</p>

          <img
            alt="icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />

          <p className="humidity">Humidity: {weather.main.humidity}%</p>
          <p className="humidity">Wind Speed: {weather.wind.speed} m/s</p>

          <button className="refresh-btn" onClick={fetchWeather}>
            Refresh
          </button>
        </>
      )}
    </div>
  );
}

export default WeatherDashboard;
