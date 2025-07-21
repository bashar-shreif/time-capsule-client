import "./styles/utilities.css";
import "./styles/colors.css";
import "./styles/index.css";


import React from 'react';

import Landing from './pages/Landing';
import { BrowserRouter } from "react-router-dom";

const App = () => {

  return (<>
    <BrowserRouter>  <Landing/>
    </BrowserRouter>
  </>);

}

export default App;
