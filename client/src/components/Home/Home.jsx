import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch , useSelector} from 'react-redux';
import {
    filter,
    filterByTemperament,
    getDog, 
    getTemps,    
    orderByName,
    orderByWeight} from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar'
import Paginado from '../Paginado/Paginado'
import Card from '../Card/Card'
import s from './Home.module.css'
import img from '../../assets/logo.png'
import { AiOutlineReload } from 'react-icons/ai'
import { MdOutlineCreate } from 'react-icons/md'

function Home () {
    const temperaments = useSelector(state => state.temperaments)
    const allDogs = useSelector(state => state.dogs)
    const dispatch = useDispatch();

    const [order, setOrder] = useState('')
    const [currentPage , setCurrentPage] = useState(1)
    const [dogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDog = allDogs?.slice(indexOfFirstDog, indexOfLastDog)
    const [loading, setLoading] = useState(true)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDog()).then(() => setLoading(false));
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemps())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getDog())
    }


    const handleFilterCreated = (e) => {
        dispatch(filter(e.target.value))
    }   

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    const handleWeight = (e) => {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    const handleFilterTemperament = (e) => {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
    }
    return(
        <> 
        {
            loading 
            ? ( <div className={s.position}>
                    <span className={s.loader}></span>
                </div>
            ) : (
                <div>
            <div className={s.bar}>
                <Link to='/'>
                    <div>
                        <img src={img} alt='logo' className={s.logo}/>
                    </div>
                </Link>
                    
                    <div className={s.envolve}> 
                    <div className={s.search}>
                        <SearchBar />
                    </div>
                <div className={s.filters}>
                <select onChange={e => handleSort(e)} className={s.filt}>
                    <option value="asc">A-Z</option>
                    <option value="dsc">Z-A</option>
                </select>
                <select onChange={e => handleWeight(e)} className={s.filt}>
                    <option value="wasc">Ascending</option>
                    <option value="wdsc">Descending</option>
                </select>
                <select onChange={e => handleFilterCreated(e)} className={s.filt}>
                    <option value="All">All</option>
                    <option value="Existing">Existing</option>
                    <option value="Created">Created</option>
                </select>
                <select onChange={e => dispatch(filterByTemperament(e.target.value))} className={s.filt}>
                    <option value="All">All Temps</option>
                    { temperaments?.sort((a,b) => { 
                        if(a.name > b.name) return 1;
                        if(a.name < b.name) return -1;
                        return 0
                    }).map(el =>{
                        return (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        )
                    })
                    }

                </select>
                </div>
                </div>
                <div className={s.buttons}>
                    <Link to="/createdog">
                        <button className={s.create}> 
                            Create Race<MdOutlineCreate/>
                        </button> 
                    </Link>
                <button className={s.reload} onClick={e => handleClick(e)}> <AiOutlineReload/> </button>
                </div>
            </div>


                {/* <Paginado
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs?.length}
                    paginado={paginado}
                /> */}
                <div> 
                <div> 
                <div className={s.container} >
                    {currentDog?.map(dog => {
                        return(
                            <div  key={dog.id}>
                                <Link className={s.link} to={`/dogs/${dog.id}`}>
                                    <Card
                                        key={dog.id}
                                        name={dog.name}
                                        image={dog.image}
                                        weight={dog.weight}
                                        height={dog.height}
                                        temperaments={
                                            dog.createInDb 
                                            ? dog.temperaments.map(temp => temp + " ")
                                            
                                            : dog.temperaments
                                        }
                                    />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs?.length}
                paginado={paginado}
            />
            </div>
        </div>
            )
        }
        </>
    )
}

export default Home;