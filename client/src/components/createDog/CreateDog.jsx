import React, { useEffect, useState } from "react";
import validate from "./validate";
import {Link, useHistory} from 'react-router-dom'
import { postDog, getTemps } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import img from '../../assets/form.png';
import img2 from '../../assets/pitbull.png'
import s from './CreateDog.module.css';

function CreateDog(){
    const dispatch = useDispatch();
    const temperaments = useSelector( state => state.temperaments.sort((a, b) => {
        if( a.name > b.name ) return -1;
        if( a.name < b.name ) return 1;
        return 0;
    }));

    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperaments: []
    })

    useEffect(() => {
        dispatch(getTemps()).then(() => setLoading(false))
    }, [dispatch])

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    }

    const handleSelect = e => {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        if(
            errors.name ||
            errors.weight ||
            errors.height ||
            errors.life_span || 
            !input.name ||
            !input.weight ||
            !input.height ||
            !input.life_span
        ){
            alert("Something is wrong xd")
        }else{
            dispatch(postDog(input))
            alert("Dog succesfully created")
        setInput({
            name: "",
            height: "",
            weight: "",
            life_span: "",
            image: "",
            temperaments: []
        })
        history.push("/home") //redirecciona a home luego de crear el perro
    }
}

    return(
        <> 
        {loading 
        ? (
            <div className={s.position}>
                <span className={s.loader}></span>
            </div> )
        : (
            <div className={s.todo}>
        <div className={s.titulo}>
        <h1 >Create new Dog</h1>
        </div>
        <img src={img} alt="pic" className={s.img}/>
        <div className={s.container}> 
            <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.group}> 
                <input
                    // placeholder="Name"
                    type='text'
                    value={input.name}
                    name="name"
                    onChange={handleChange}
                    className={s.input}
                    required
                />
                <label htmlFor="name" className={s.label}>Name</label>
                {errors.name && <p className={s.error}>{errors.name}</p>}
            </div>
            <div className={s.group}> 
                <input
                    // placeholder="Height"
                    type='text'
                    value={input.height}
                    name="height"
                    onChange={handleChange}
                    className={s.input}
                    required
                />
                <label htmlFor="height"  className={s.label}>Height</label>
                {errors.height && <p className={s.error}>{errors.height}</p>}
            </div>
            <div className={s.group}> 
                <input
                    // placeholder="Weight"
                    type='text'
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}
                    className={s.input}
                    required
                />

                <label htmlFor="weight" className={s.label}>Weight</label>
                {errors.weight && <p className={s.error}>{errors.weight}</p>}
            </div>
            <div className={s.group}> 
                <input
                    // placeholder="Years"
                    type='text'
                    value={input.life_span}
                    name="life_span"
                    onChange={handleChange}
                    className={s.input}
                    required
                />
                <label htmlFor="years" className={s.label}>Years</label>

                {errors.life_span && <p className={s.error}>{errors.life_span}</p>}
            </div>
            <div className={s.group}> 
                <input
                    // placeholder="Image URL"
                    type='text'
                    value={input.image}
                    name="image"
                    onChange={handleChange}
                    className={s.input}
                    required
                />
                <label htmlFor="image" className={s.label}>Image URL</label>
            </div>
            <div className={s.group}>
            <label htmlFor="temperaments" className={s.tempTitle}>Temperaments:</label>
            <select className={s.input}
                    required onChange={handleSelect}>
                {temperaments?.map(temp => (
                    <option key={temp.id} value={temp.name}>{temp.name}</option>
                ))}
            </select>
            <ul className={s.ul}>
                {<li className={s.li}>{input.temperaments?.map(el => el + ", ")}</li>}
            </ul>
            </div>
            <div className={s.btns}> 
            <button type="submit">
                    Create
            </button>
            <Link to='/home'>
                <button>
                    Back
                </button>
            </Link>
            </div>
            </form>
        <img src={img2} alt="pic" className={s.img2}/>

        </div>
        </div>
        ) }
        </>
    )

}


export default CreateDog;