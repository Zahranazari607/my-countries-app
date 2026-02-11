const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    className="search-input"
    placeholder="🔍 Search country name..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
export default SearchInput;