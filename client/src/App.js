import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/Landing Page/LandingPage'
import CreateDog from './components/createDog/CreateDog'
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home} />
        <Route exact path='/createdog' component={CreateDog} />
        <Route exact path='/dogs/:id' component={Detail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
