
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import CountriesList from "./CountriesList";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme()

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <Dropdown />
      </div>
      <CountriesList query={query} />
    </main>
  );
}
