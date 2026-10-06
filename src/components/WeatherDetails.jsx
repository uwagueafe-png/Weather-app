function WeatherDetails({ weather }) {
  const current = weather.current;

  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-white/30 bg-white/30 p-4 shadow-sm backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Humidity
        </p>

        <p className="mt-3 text-2xl font-bold text-slate-900">
          {current.relative_humidity_2m}%
        </p>
      </div>

      <div className="rounded-2xl border border-white/30 bg-white/30 p-4 shadow-sm backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Wind
        </p>

        <p className="mt-3 text-2xl font-bold text-slate-900">
          {Math.round(current.wind_speed_10m)} km/h
        </p>
      </div>
    </div>
  );
}

export default WeatherDetails;