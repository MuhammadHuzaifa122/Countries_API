import { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import CountriesList from "./CountriesList";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Home() {
  const [query, setQuery] = useState('')
  const [isDark] = useContext(ThemeContext)
  return (
    <main className={`${isDark ? 'dark' : ''}`}>
        <div className="search-filter-container">
          <SearchBar setQuery={setQuery}/>
          <Dropdown />
        </div>
        {
          query === 'unmount' ? '' : <CountriesList query={query} />
        }
      </main>
  )
}
