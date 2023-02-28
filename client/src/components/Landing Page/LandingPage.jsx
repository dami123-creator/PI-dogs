import React from "react";
import {Link } from 'react-router-dom';
import s from './LandingPage.module.css'
import img1 from '../../assets/celuuu.png'
import img2 from '../../assets/completo.png'

function LandingPage() {
    return(
        <div className={s.container}>
        <div className={s.titleContainer}>
            <h1>Welcome to Thor's Friends</h1>
        </div>
        <img src={img2} alt='img' className={s.img2}/>
        <div className={s.containerBtn}>
            <Link to='/home' className={s.link}>
                <button className={s.btn}>
                <span className={s.spn}>Entrar</span>
                </button>
            </Link>
        </div>
        <img src={img1} alt='img' className={s.img1}/>
        </div>
    )
}

export default LandingPage;