import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions'
import s from './SearchBar.module.css'
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');


    const handleInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name) alert('ingrese un nombre para buscar')
        else dispatch(getByName(name))
    }

    return(
        <div className={s.wrap}>
            <div className={s.search}> 
                <input placeholder="Search by name"
                type='text'
                onChange={e => handleInputChange(e)} className={s.searchTerm} ></input>
                <button
                type="submit"
                onClick={e => handleSubmit(e)} className={s.searchButton}><AiOutlineSearch/></button>
                </div>
        </div>
    )
}

export default SearchBar;