import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchInput from './components/SearchInput';
import RegionFilter from './components/RegionFilter';
import CountryList from './components/CountryList';
import StatusMessages from './components/StatusMessages';
import './App.css';

function App() {
  // 1) States (Mandatory)
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  // Fetch Logic (Mandatory)
  const fetchData = async (signal) => {
    setLoading(true);
    setError(null);
    
    const fields = "?fields=name,flags,region,population,cca3";
    let url = "";
    
    if (search.trim().length >= 2) {
      url = `https://restcountries.com/v3.1/name/${search}${fields}`;
    } else if (region !== "all") {
      url = `https://restcountries.com/v3.1/region/${region}${fields}`;
    } else {
      url = `https://restcountries.com/v3.1/all${fields}`;
    }

    try {
      const response = await fetch(url, { signal }); 
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No countries found matching your criteria.");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch data from API.");
      }
      
      const data = await response.json();

      // Sort by Population (High to Low)
      const sortedData = Array.isArray(data) 
        ? data.sort((a, b) => b.population - a.population) 
        : data;
      
      setCountries(sortedData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setCountries([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear Filters Function
  const clearFilters = () => {
    setSearch("");
    setRegion("all");
  };

  // useEffect (Mandatory + Bonus Debounce)
  useEffect(() => {
    const controller = new AbortController();
    
    const delayDebounceFn = setTimeout(() => {
      fetchData(controller.signal);
    }, 500); 

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [search, region]);

  return (
    <div className="app-container">
      <Navbar />
      <div className="container">
        <div className="controls">
          {/* 🔍 Search input (Mandatory) */}
          <SearchInput value={search} onChange={setSearch} />

          {/* Clear Filters Button */}
          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
          
          {/* Region dropdown (Mandatory) */}
          <RegionFilter value={region} onChange={setRegion} />
        </div>

        {/* A short message showing number of countries and sorting info */}
        {!loading && !error && countries.length > 0 && (
        <p className="results-info">
            Showing <strong>{countries.length}</strong> countries, sorted by population (high to low)
          </p>
        )}

        {/* Loading + Error UI (Mandatory) */}
        <StatusMessages 
          loading={loading} 
          error={error} 
          onRetry={() => fetchData()} 
        />

        {/* Countries List UI (Mandatory) */}
        {!loading && !error && (
          <CountryList countries={countries} />
        )}
      </div>
    </div>
  );
}

export default App;