import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //esta linea nos sirve para conerctanos con la extension del navegador redux devtools


export const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) //esta linea me sirve para hacer peticiones a la API 
    );