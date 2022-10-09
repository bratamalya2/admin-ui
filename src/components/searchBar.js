import React from 'react';
import '../styles/searchBar.css';

function SearchBar({ searchText, setSearchText }) {
    return (
        <div className='searchbar-area'>
            <input type='text' value={searchText} placeholder='Search by name, email or role' onChange={(e) => {
                setSearchText(e.target.value);
            }} />
        </div>
    );
}

export default SearchBar;
