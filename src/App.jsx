import "./styles/utilities.css";
import "./styles/colors.css";
import "./styles/index.css";


import React from 'react';

import Login from './pages/Login';
import Register from './pages/Register';

import { BrowserRouter } from "react-router-dom";

const App = () => {

  return (<>
    <BrowserRouter>  <Login></Login>
    <Register></Register>
    </BrowserRouter>
  </>);

}

export default App;
