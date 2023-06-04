import React from 'react';
import { useState, useEffect } from 'react';
import API from '../../utils/Api';

export default function SearchForm(props) {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'search') {
            setSearch(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchRes = await API.findProjectsByLang(search.toUpperCase());

        // setResult( [ ...result, ...searchRes ] )

        props.result(searchRes);

        // console.log(searchRes);

        setSearch('');
    }

    return (
        <form className='search-form' onSubmit={handleSubmit}>
            <div className='row'>
                <div>
                    <label for='search'>Language:</label>
                    <input name='search' value={search} onChange={handleChange} placeholder='Search a language'/>
                </div>
                <div>
                    <button type='submit'>Search</button>
                </div>
            </div>
        </form>
    )
}