import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

const DEFAULT_CITY = "Port Harcourt";
const DEFAULT_LOCATION = {
  latitude: 4.8156,
  longitude: 7.0498,
};

async function fetchWeatherForLocation(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
  );

  if (!response.ok) {
    throw new Error("Weather data could not be loaded.");
  }

  return response.json();
}

function App() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState(DEFAULT_CITY);

  const [coordinates, setCoordinates] = useState(DEFAULT_LOCATION);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadWeather(city, latitude, longitude) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await fetchWeatherForLocation(latitude, longitude);

      setWeather(data);
      setCityName(city);
    } catch (error) {
      setErrorMessage(error.message || "Unable to fetch weather.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(city) {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          trimmedCity
        )}&count=1`
      );

      if (!response.ok) {
        throw new Error("City lookup failed.");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error(`No weather data found for "${trimmedCity}".`);
      }

      const result = data.results[0];

      setCityName(result.name || trimmedCity);

      setCoordinates({
        latitude: result.latitude,
        longitude: result.longitude,
      });
    } catch (error) {
      setErrorMessage(
        error.message || "Unable to search for that city."
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function fetchCurrentWeather() {
      try {
        const data = await fetchWeatherForLocation(
          coordinates.latitude,
          coordinates.longitude
        );

        setWeather(data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(
          error.message || "Unable to fetch weather."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrentWeather();

    const interval = setInterval(fetchCurrentWeather, 600000);

    return () => {
      clearInterval(interval);
    };
  }, [coordinates]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fbff_0%,_#dfeaf7_35%,_#cbd5e1_100%)] px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-md">
        <div className="mb-4 rounded-[28px] border border-white/40 bg-white/50 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-md">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        )}

        {weather && (
          <WeatherCard
            weather={weather}
            cityName={cityName}
          />
        )}
      </div>
    </div>
  );
}

export default App;