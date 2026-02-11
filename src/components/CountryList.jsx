import CountryCard from './CountryCard';

const CountryList = ({ countries }) => {
  // Bonus: No results found UI
  if (countries.length === 0) {
    return <div className="no-results">😞 No results found!</div>;
  }

  return (
    <div className="countries-grid">
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};
export default CountryList;