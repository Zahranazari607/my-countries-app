const RegionFilter = ({ value, onChange }) => (
  <select className="region-select" value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="all">all</option>
    <option value="africa">Africa</option>
    <option value="americas">Americas</option>
    <option value="asia">Asia</option>
    <option value="europe">Europe</option>
    <option value="oceania">Oceania</option>
  </select>
);
export default RegionFilter;