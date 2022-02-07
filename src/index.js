import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import { MyCountryRoads } from './components/MyCountryRoads';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <MyCountryRoads />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
