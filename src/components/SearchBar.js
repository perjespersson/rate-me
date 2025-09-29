function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search movie..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <button className="btn btn-dark fw-bold" onClick={() => setSearchTerm("")}>
        X
      </button>
    </div>
  );
}

export default SearchBar;