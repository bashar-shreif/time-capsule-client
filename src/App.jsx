import "./styles/utilities.css";
import "./styles/App.css";
import "./styles/colors.css";
import "./styles/index.css";


import React from 'react';

import NotFound from './pages/NotFound';

import { BrowserRouter } from "react-router-dom";

const App = () => {

  return (<>
    <BrowserRouter>  <NotFound></NotFound>
    </BrowserRouter>
  </>);

}

export default App;
