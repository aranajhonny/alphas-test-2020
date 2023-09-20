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
    if (id) {
      fetch(`https://restcountries.com/v3.1/alpha/${id}`)
        .then((res) => res.json())
        .then((data) => setCountry(data[0]));
    }
  }, [id]);
  // to resolve borders
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);
  function getBorder(code) {
    const border = countries && countries.find((x) => x.cca3 == code);
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
              <img src={country.flags.svg} alt="flag" />
            </div>

            <div className="product-desc">
              <h1 className="product-country-name">{country.name.official}</h1>
              <div className="product-desc-container">
                <div className="product-desc-container-l">
                  <span>Native name: {country.name.common}</span>
                  <br />
                  <span>Population: {country.population}</span>
                  <br />
                  <span>Region: {country.region}</span>
                  <br />
                  <span>Sub Region: {country.subregion}</span>
                  <br />
                  <span>Capital: {country.capital[0]}</span>
                  <br />
                </div>
                <div className="product-desc-container-r">
                  <span>Top Level Domain: {country.tld}</span>
                  <br />
                  <div>
                    <span>
                      Currencies:
                      {country?.currencies && (
                        <span>
                          {Object.keys(country.currencies).map(
                            (currencyCode, index) => (
                              <span key={index}> {currencyCode}</span>
                            )
                          )}
                        </span>
                      )}
                    </span>
                    <br />
                    <span>
                      Languages:
                      {country?.languages && (
                        <span>
                          {Object.values(country.languages).map(
                            (language, index) => (
                              <span key={index}> {language} </span>
                            )
                          )}
                        </span>
                      )}
                    </span>
                  </div>
                  <br />
                </div>
              </div>
              <div className="borders">
                Borders Countries: <br />
                {country.borders.map((code, index) => {
                  const borderCountry = getBorder(code);

                  if (borderCountry) {
                    return (
                      <Link
                        key={index}
                        href="/country/[id]"
                        as={`/country/${borderCountry.cca3}`}
                      >
                        <span key={index} className="border-button">
                          {borderCountry.name.common}
                        </span>
                      </Link>
                    );
                  }

                  return null; // Return null for invalid country codes
                })}
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
