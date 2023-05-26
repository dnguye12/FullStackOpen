const Filter = ({searchName, handleSearchNameChange}) => {
    return (
        <div>
            Filter shown with <input value={searchName} onChange={handleSearchNameChange}></input>
        </div>
    )
}

export default Filter