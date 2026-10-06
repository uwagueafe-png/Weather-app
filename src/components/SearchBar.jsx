import { useState } from "react";

function SearchBar({ onSearch, isLoading }) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (city.trim() === "" || isLoading) {
      return;
    }

    onSearch(city);
    setCity("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <label className="sr-only" htmlFor="city-search">
        Search for a city
      </label>

      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
            <path d="M12 21s6-5.686 6-11a6 6 0 1 0-12 0c0 5.314 6 11 6 11Z" />
            <circle cx="12" cy="10" r="2.4" />
          </svg>
        </span>

        <input
          id="city-search"
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
          disabled={isLoading}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-70"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;