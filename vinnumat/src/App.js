import React, { Component } from 'react';
import logo from './logo.svg';
import TeacherForm from './TeacherForm'
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
        	<div className="mainBody">
        		<p className="App-intro">
          			Vinnumatssíða
        		</p>
        		<TeacherForm/>
      		</div>
      	</div>
    );
  }
}

export default App;
