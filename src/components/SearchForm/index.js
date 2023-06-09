import React from 'react';
import { useState, useEffect } from 'react';
import API from '../../utils/Api';
import './style.css';

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
        try {
            e.preventDefault();
            
            if (props.type === 'LANGUAGE') {
                const searchRes = await API.findProjectsByLang(search.toUpperCase());
                props.result(searchRes);
            } else if (props.type === 'NAME') {
                const searchRes = await API.findProjectsByName(search);
                props.result(searchRes);
            }
            
            setSearch('');
        } catch (error) {
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='row d-flex justify-content-center text-center p-2 my-2'>
                <div className='col-4 d-flex justify-content-center align-items-center text-center search-form p-2'>
                    <label className='search-label mx-2' htmlFor='search'>{props.type}</label>
                    <input className='search-input mx-2' name='search' value={search} onChange={handleChange} placeholder={"Search by " + props.type.toLowerCase() + "..."}/>
                    <button className='search-btn mx-2' type='submit'>Search</button>
                </div>
            </div>
        </form>
    )
}