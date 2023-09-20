import Link from "next/link";

function Country({ countries }) {
  return (
    <>
      {countries &&
        countries.map((country, index) => {
          return (
            <Link
              key={index}
              href="/country/[id]"
              as={`/country/${country.cca3}`}
            >
              <div className="flags-columns" key={index}>
                <img src={country.flags.svg} alt="flag" />
                <h4 className="country-name">{country.name.common}</h4>
                <span className="key">
                  <strong>Population:</strong>
                </span>
                <span> {country.population}</span>
                <br></br>
                <span className="key">
                  <strong>Region: </strong>
                </span>
                <span> {country.region}</span>
                <br></br>
                <span className="key">
                  <strong>Capital: </strong>
                </span>
                <span>{country.capital}</span>
                <br></br>
              </div>
            </Link>
          );
        })}
    </>
  );
}
export default Country;
