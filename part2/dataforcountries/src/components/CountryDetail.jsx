import Weather from "./Weather";

const CountryDetail = ({ country }) => {
  if (!country) return null;

  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>
        <p>Capital: {country.capital?.[0] || "N/A"}</p>
        <p>Area: {country.area.toLocaleString()} km²</p>
      </div>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages || {}).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <div className="flag-container">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="flag-image"
        />
      </div>

      {country.capital && <Weather city={country.capital[0]} />}
    </div>
  );
};

export default CountryDetail;
