import WeatherDetails from "./WeatherDetails";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6M18.9 18.9l-1.6-1.6M6.7 6.7 5.1 5.1" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">
      <path d="M7 18.5h9.5A3.5 3.5 0 0 0 16 9.7a5 5 0 0 0-9.4 2.2A3.2 3.2 0 0 0 7 18.5Z" />
    </svg>
  );
}

function CloudSunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">
      <circle cx="14.5" cy="8.5" r="3.4" />
      <path d="M8 17.5h8.8A3.6 3.6 0 0 0 17.3 9a4.9 4.9 0 0 0-9.2 1.8A3.1 3.1 0 0 0 8 17.5Z" />
      <path d="M14.5 2.8v1.7M14.5 15.2v1.7M19.1 8.5h-1.7M7.4 8.5H5.7M17.6 5l-1.2 1.2M11.4 11.2l-1.2 1.2M17.6 12l-1.2-1.2M11.4 8.4l-1.2-1.2" />
    </svg>
  );
}

function FogIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">
      <path d="M4 8.5h13M4 12h16M4 15.5h12M18 15.5h2M18 8.5h2" />
    </svg>
  );
}

function CloudRainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">
      <path d="M7 18.5h9.5A3.5 3.5 0 0 0 16 9.8a5 5 0 0 0-9.4 2.2A3.2 3.2 0 0 0 7 18.5Z" />
      <path d="M10 18.5v2M14.5 18.5v2" />
    </svg>
  );
}

function CloudSnowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">
      <path d="M7 18.5h9.5A3.5 3.5 0 0 0 16 9.8a5 5 0 0 0-9.4 2.2A3.2 3.2 0 0 0 7 18.5Z" />
      <path d="M10 18.5v2.2M12 17l-1.3 1.5L12 20l1.3-1.5L12 17Zm2-1.5-1.3 1.5L12 19l1.3-1.5L12 16l-1.3 1.5L12 19l1.3-1.5Z" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.75]">
      <path d="M13.5 2.5 6 12.5h4.8L8 21.5l8.6-11H12.1L13.5 2.5Z" />
    </svg>
  );
}

function getWeatherCondition(code) {
  if (code === 0) {
    return { label: "Clear sky", icon: <SunIcon />, panelClass: "from-amber-200 via-orange-100 to-sky-100" };
  }

  if (code === 1 || code === 2) {
    return { label: "Partly cloudy", icon: <CloudSunIcon />, panelClass: "from-sky-200 via-cyan-100 to-slate-100" };
  }

  if (code === 3) {
    return { label: "Overcast", icon: <CloudIcon />, panelClass: "from-slate-300 via-slate-200 to-slate-100" };
  }

  if (code === 45 || code === 48) {
    return { label: "Foggy", icon: <FogIcon />, panelClass: "from-slate-300 via-zinc-200 to-slate-100" };
  }

  if (code >= 51 && code <= 57) {
    return { label: "Drizzle", icon: <CloudRainIcon />, panelClass: "from-cyan-200 via-blue-100 to-slate-100" };
  }

  if (code >= 61 && code <= 67) {
    return { label: "Rainy", icon: <CloudRainIcon />, panelClass: "from-sky-300 via-blue-200 to-indigo-100" };
  }

  if (code >= 71 && code <= 77) {
    return { label: "Snowy", icon: <CloudSnowIcon />, panelClass: "from-blue-100 via-sky-100 to-slate-100" };
  }

  if (code >= 80 && code <= 82) {
    return { label: "Rain showers", icon: <CloudRainIcon />, panelClass: "from-sky-300 via-indigo-200 to-slate-100" };
  }

  if (code >= 95) {
    return { label: "Thunderstorm", icon: <LightningIcon />, panelClass: "from-violet-300 via-indigo-200 to-slate-100" };
  }

  return { label: "Unknown", icon: <SunIcon />, panelClass: "from-slate-200 via-slate-100 to-slate-50" };
}

function WeatherCard({ weather, cityName }) {
  const current = weather.current;
  const condition = getWeatherCondition(current.weather_code);

  return (
    <div className={`relative overflow-hidden rounded-[32px] border border-white/50 bg-gradient-to-br ${condition.panelClass} p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)]`}>
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-12 left-1/3 h-24 w-24 rounded-full bg-white/15 blur-2xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-600">
              Current weather
            </p>
            <h1 className="mt-3 text-3xl font-black text-slate-900">
              {cityName}
            </h1>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/35 text-slate-700 shadow-sm backdrop-blur-sm">
            {condition.icon}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-end gap-2">
            <p className="text-6xl font-black leading-none text-slate-900">
              {Math.round(current.temperature_2m)}°
            </p>
            <span className="mb-2 text-2xl font-semibold text-slate-700">C</span>
          </div>

          <p className="mt-3 text-lg font-medium text-slate-700">
            {condition.label}
          </p>
        </div>

        <WeatherDetails weather={weather} />
      </div>
    </div>
  );
}

export default WeatherCard;

