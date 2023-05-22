import React from 'react';
import './App.css';
import Tabs from "./Components/TabComponent/Tabs";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

function App() {
  return (
    <Router>
      <nav className='navbar navbar-primary bg-primary'>
        <Link className='navbar-brand ms-3 text-white' to='/'>Currency Exchange Rates</Link>
      </nav><div className="App">
          <Tabs />
        </div>
    </Router>
  );
}

export default App;
