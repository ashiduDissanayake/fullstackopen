import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    weatherService
      .getWeather(city)
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        setError("Failed to load weather data");
        setLoading(false);
      });
  }, [city]);

  if (loading) return <p>Loading weather information...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return null;

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>
        <strong>Temperature:</strong> {weather.main.temp} °C
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>
        <strong>Wind:</strong> {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default Weather;
