import React from 'react';
import { useState, useEffect } from 'react';
import API from '../../utils/Api';

export default function SearchForm() {
    const [search, setSearch] = useState('');

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'search') {
            setSearch(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        const searchRes = API.findProjectsByLang(search);

        console.log(searchRes);

        setSearch('');
    }

    return (
        <div className='row'>
            <form className='search-form'>
                <div>
                    <label for='search'>Language:</label>
                    <input name='search' value={search} onChange={handleChange} placeholder='Search a language'/>
                </div>
                <div>
                    <button type='submit' onSubmit={handleSubmit}>Search</button>
                </div>
            </form>
        </div>
    )
}