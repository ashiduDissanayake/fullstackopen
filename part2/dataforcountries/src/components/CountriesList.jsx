const CountriesList = ({ countries, onSelect }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onSelect(country)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
