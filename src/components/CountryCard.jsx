const CountryCard = ({ country }) => {
  return (
    <div className="country-card">
      <img src={country.flags?.svg || country.flags?.png} alt="Flag" />
      <div className="card-content">
        <h3>{country.name?.common || "Unknown"}</h3>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
      </div>
    </div>
  );
};
export default CountryCard;