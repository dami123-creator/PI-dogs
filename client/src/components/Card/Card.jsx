import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css'

function Card({name, image, temperaments, weight}) {
    return(
        
            <div className={s.container}>
                <img src={image} alt="not found" width='250px' height='250px' className={s.img} />
                <div className={s.info}> 
                    <h2 className={s.name}>{name}</h2>
                    <p className={s.temps}>Temperament: {temperaments}</p>
                    <h4 className={s.peso}>Weight: {weight} Kg</h4>
                    <button className={s.boton}>Get Detail!</button>
                </div>
            </div>  
        
    )
}

export default Card;