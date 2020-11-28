import React, { useState, useEffect } from "react";
import Country from "../components/Country";
import Header from "../components/Header";
import Select from "../components/Select";
import { ThemeProvider } from "../lib/useTheme";

function Countries() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [countries, setCountries] = useState(null);
  function stringIncludes(a, b) {
    return a.indexOf(b) !== -1;
  }
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (selectedOption) {
      fetch(`https://restcountries.eu/rest/v2/region/${selectedOption.value}`)
        .then((res) => res.json())
        .then((data) => setCountries(data));
    }
  }, [selectedOption]);

  function getCountries() {
    if (searchTerm.length > 1) {
      const results = countries.filter((pro) =>
        stringIncludes(pro.name.toLowerCase(), searchTerm.toLocaleLowerCase())
      );
      if (results) {
        return results;
      }
    } else {
      return countries;
    }
  }

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <div className="search-bar">
          <div className="search-form">
            <form action="">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search for a country"
                className="search-input"
              />
            </form>
          </div>
          <Select
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className="container">
          <Country countries={getCountries()} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Countries;
