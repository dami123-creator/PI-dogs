import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import s from './Detail.module.css'


export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();
  const {id} = useParams()
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(getDetail(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.detail);

  console.log(myDog)

  return (
    <div> 
   {loading ? (
    <div className={s.position}>
      <span className={s.loader}></span>
     </div>
   ) : (
    <div className={s.container}>
      <h1>Detail</h1>
      <div className={s.info}>
          <div>
            <div className="image">
              <img
                src={myDog.image}
                alt="not found"
                width="450px"
                height="300px"
                className={s.img}
              />
            </div>
            <div className={s.moreInfo}>
              <h2 className={s.title}>{myDog?.name}</h2>
              <h5 className={s.temp}>
                Temperament:{" "}
                {myDog.createInDb
                  ? myDog?.temperaments.map((t) => t.name + " ")
                  : myDog?.temperaments}
              </h5>
              <div className={s.cont}> 
                <div className={s.display}>
                  <h5>Weight: {myDog?.weight} Kgs.</h5>
                  <h5>Height: {myDog?.height} cm.</h5>
                  <h5>Longevity: {myDog.life_span}</h5>
                </div>                  
              </div>
              </div>
              <Link to="/home">
                <button className={s.btn}>Back</button>
              </Link>
            
          </div>
      </div>
    </div>
                
   )}
   </div>
   
  );
}