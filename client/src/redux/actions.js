import { GET_DOGS, DOGS_DETAIL, GET_BY_NAME, GET_TEMPERAMENT,
        FILTER, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_BY_TEMPERAMENT, POST_DOG } from "./actions-types";
import axios from 'axios';

export function getDog() {
    return async function (dispatch) {
        const response = await axios('http://localhost:3001/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        })
    }
}

export function getByName(name){
    
        return async function(dispatch){
            try{
                const response = await axios(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_BY_NAME,
                payload: response.data
            })
            }catch(e){
            alert("No matches")
            }
    }
}

export function postDog(name) {
    return async function(dispatch){
        const response = await axios.post(`http://localhost:3001/dogs`, name)
        return dispatch({
            type: POST_DOG,
            response
        })
    }
}

export function getTemps() {
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/temperament`)
        return dispatch({
            type: GET_TEMPERAMENT,
            payload: response.data
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: DOGS_DETAIL,
            payload: response.data
        })
    }
}
// export const getDetail = (id) => async (dispatch) => {
//     try {
//         const response = await axios.get(`http://localhost:3001/dogs/${id}`);
//         dispatch({
//             type: DOGS_DETAIL,
//             payload: response.data,
//         });
//     } catch (error) {
//         dispatch({
//             type: "DOG_DETAIL_ERROR",
//             payload: error.response?.data?.message || 'Unexpected error occurred',
//         });
//     }
// };

export function filter(payload){
    return {
        type: FILTER,
        payload,
    }
}

export function filterByTemperament(payload){
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function orderByName(payload) {
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByWeight(payload) {
    return{
        type: ORDER_BY_WEIGHT,
        payload
    }
}

