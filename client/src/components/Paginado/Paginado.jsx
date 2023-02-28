import React from "react";
import s from './Paginado.module.css'

function Paginado({dogsPerPage, allDogs, paginado}){
    const pageNumber = [];

    for(let i = 0; i <= Math.ceil(allDogs / dogsPerPage) -1; i++){
        pageNumber.push(i + 1);
    }

    return(
        <div>
            <nav className={s.nav}>
                <ul >
                    {pageNumber && 
                        pageNumber.map(n => ( 
                            <button key={n} onClick={() => paginado(n)} className={s.btn}>
                                    {n}                
                            </button>
                        ))}
                </ul>
            </nav>
        </div>
    )
}

export default Paginado;