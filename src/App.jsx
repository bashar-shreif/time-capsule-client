import "./styles/utilities.css";
import "./styles/App.css";
import "./styles/colors.css";
import "./styles/index.css";


import React from 'react';

import Map from './pages/Map';
import Auth from './pages/Auth';

import { BrowserRouter } from "react-router-dom";

const App = () => {

  return (<>
    <BrowserRouter>  <Map></Map> <Auth></Auth>
    </BrowserRouter>
  </>);

}

export default App;
