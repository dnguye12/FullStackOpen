const SearchBar = ({search, handleSearchChange, doSearch}) => {
    return (
        <form onSubmit={doSearch}>
            <input
                value={search}
                onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar;