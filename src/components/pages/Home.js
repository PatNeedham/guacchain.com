import React from 'react';
import './App.css';
import guacIMG from './guac.jpg';

const App = () => (
  <div>
    <p>Guac Chain</p>
    <p>Freshly made guacamole, on the blockchain...</p>
    <img id="guac" src={guacIMG} height={282} width={300} alt="guac" />
  </div>
);

export default App;
