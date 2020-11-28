import React, { useState, useEffect } from "react";
import Country from "../../components/Country";
import Header from "../../components/Header";
import Select from "../../components/Select";
import { ThemeProvider } from "../../lib/useTheme";
import Link from "next/link";

import { useRouter } from "next/router";
import Countries from "..";

const Component = () => {
  const router = useRouter();
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState(null);
  const { id } = router.query;
  // TODO: refactor
  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, [id]);
  // to resolve borders
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);
  function getBorder(code) {
    const border = countries && countries.find((x) => x.alpha3Code == code);
    return border && border;
  }
  return (
    <ThemeProvider>
      {country && (
        <div className="App">
          <Header />
          <div className="back-bar">
            <div className="back-button">
              <Link href="/">
                <button className="button">⬅ Back</button>
              </Link>
            </div>
          </div>
          <div className="product-single">
            <div className="product-image">
              <img src={country.flag} alt="flag" />
            </div>

            <div className="product-desc">
              <h1 className="product-country-name">{country.name}</h1>
              <div className="product-desc-container">
                <div className="product-desc-container-l">
                  <span>Native name: {country.nativeName}</span>
                  <br />
                  <span>Population: {country.population}</span>
                  <br />
                  <span>Region: {country.region}</span>
                  <br />
                  <span>Sub Region: {country.subregion}</span>
                  <br />
                  <span>Capital: {country.capital}</span>
                  <br />
                </div>
                <div className="product-desc-container-r">
                  <span>Top Level Domain: {country.topLevelDomain}</span>
                  <br />
                  <span>
                    Currencies:
                    {country.currencies &&
                      country.currencies.map(
                        (money, index) => " " + money.code
                      )}
                  </span>
                  <br />
                  <span>
                    languages:
                    {country.languages &&
                      country.languages.map(
                        (money, index) => " " + money.name + " "
                      )}
                  </span>
                  <br />
                </div>
              </div>
              <div className="borders">
                Borders Countries: <br />
                {country.borders.length > 1 &&
                  country.borders.map((code, index) => (
                    <Link
                      key={index}
                      href="/country/[id]"
                      as={`/country/${
                        getBorder(code) && getBorder(code).alpha3Code
                      }`}
                    >
                      <span key={index} className="border-button">
                        {getBorder(code) && getBorder(code).name}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default Component;
// alpha3Code;
