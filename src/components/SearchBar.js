function SearchBar({ searchTerm, onSearchChange, onClear }) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search movie..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />

      <button className="btn btn-dark" onClick={onClear}>
        <b>X</b>
      </button>
    </div>
  );
}

export default SearchBar;