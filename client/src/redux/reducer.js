import { GET_DOGS, DOGS_DETAIL, GET_BY_NAME, GET_TEMPERAMENT, POST_DOG, FILTER_BY_TEMPERAMENT, FILTER, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "./actions-types";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: []
}



const reducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case GET_BY_NAME:
            return{
                ...state,
                dogs: action.payload
            }

        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            }

        case DOGS_DETAIL:
            return{
                ...state,
                detail: action.payload
            }

        case POST_DOG:
            return{
                ...state
            }
            case FILTER_BY_TEMPERAMENT:
                const allDogs = state.allDogs;
                let tempFiltered;
                if (action.payload === "All") {
                    tempFiltered = allDogs;
                } else {
                    tempFiltered = allDogs.filter(e => {
                    if (typeof e.temperaments === 'string') {
                        return e.temperaments.includes(action.payload);
                    }
                    if (Array.isArray(e.temperaments)) {
                        return e.temperaments.includes(action.payload);
                    }
                    if (typeof e.temperaments === 'object') {
                        const temperamentsArr = Object.values(e.temperaments).flat();
                        return temperamentsArr.includes(action.payload);
                    }
                    return true;
                    });
                }
                return {
                    ...state,
                    dogs: tempFiltered,
                };

            
        case FILTER:
            const createFilter = 
            action.payload ==="Created" 
                ? state.allDogs.filter(e => e.createInDb)
                : state.allDogs.filter(e => !e.createInDb)
            
            return {
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : createFilter
            };

        case ORDER_BY_NAME:
            const sortOrder = action.payload === 'asc' ? 1 : -1;
            const sortedDogs = state.dogs.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase()
                if(nameA > nameB) return sortOrder;
                if(nameA < nameB) return -sortOrder;
                return 0;
            })
            return {
                ...state,
                dogs: sortedDogs
            }
            
        case ORDER_BY_WEIGHT:
            const isAsc = action.payload === 'wasc';
            const sortedByWeight = state.allDogs.sort((a,b) => {
                const pesoA = parseInt(a.weight)
                const pesoB = parseInt(b.weight)
                if(isAsc){
                    return pesoA > pesoB ? 1 : pesoA < pesoB ? -1 : 0;
                }else{
                    return pesoA < pesoB ? 1 : pesoA > pesoB ? -1 : 0;
                }
            })
            return {
                ...state,
                dogs: sortedByWeight
            }
        
        default: 
            return {...state}
    }
}

export default reducer;