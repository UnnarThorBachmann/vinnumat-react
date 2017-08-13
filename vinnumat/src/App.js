import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>
          	<img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>
          	<h1>Vinnumat</h1>
          </div>
        </div>
        <p className="App-intro">
          Vinnumatssíða
        </p>
      </div>
    );
  }
}

export default App;
