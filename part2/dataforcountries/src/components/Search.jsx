const Search = ({ value, onChange }) => {
  return (
    <div>
      <label>Find countries: </label>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
