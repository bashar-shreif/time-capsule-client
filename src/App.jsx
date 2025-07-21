import "./styles/utilities.css";
import "./styles/App.css";
import "./styles/colors.css";
import "./styles/index.css";


import React from 'react';

import Profile from './pages/Profile';

import { BrowserRouter } from "react-router-dom";

const App = () => {

  return (<>
    <BrowserRouter>  <Profile></Profile>
    </BrowserRouter>
  </>);

}

export default App;
