import React, { useState, useEffect } from "react";
import {
  fetchWeatherData,
  processWeatherData,
  ProcessedWeatherData,
} from "./weatherApi";

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<ProcessedWeatherData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeatherData() {
      try {
        const data = await fetchWeatherData(40.7128, 71.006);
        const processedData = processWeatherData(data);
        setWeatherData(processedData);
      } catch (err) {
        setError("failed to load weather data");
        console.error("Failed to load weather data", err);
      }
    }

    loadWeatherData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!weatherData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <label htmlFor="Location">Location</label>
        <input type="text" />
      </div>

      <div>
        <h2>Location:</h2>
        <h3>Current Weather</h3>
        <p>Temperature: {weatherData.current.temperature}</p>
        <p>Windspeed: {weatherData.current.windspeed}</p>
        <h2>7 Day Forecast</h2>
        {weatherData.daily.map((day) => (
          <div key={day.date}>
            <p>{new Date(day.date).toLocaleDateString()}</p>
            <p>
              Max: {day.maxTemp}, Min: {day.minTemp}
            </p>
            <p>Precipitation: {day.precipitation} mm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
