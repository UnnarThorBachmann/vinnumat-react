import React, { Component } from 'react';
import logo from './logo.svg';
import TeacherForm from './TeacherForm'
import Media from 'react-bootstrap/lib/Media';
import './App.css';

class App extends Component {
  render() {
    return (
     	<div className="App">
    		<div className="App-header">
          		<Media>
      				<Media.Left align="top">
        				<img src={logo} className="App-logo" alt="Image"/>
      				</Media.Left>
      				<Media.Body>
        				<h1>Vinnumat</h1>
        			</Media.Body>
    			</Media>
        	</div>
        	<div className="mainBody">
        		<h2>Kynning</h2>
        		<p className="App-intro">
          			Vinnumat kennara skiptist í A-, B- og C-hluta. Vinnumat A-hluta ræðst af vinnumati hópa sem kennari kennir. Vinnumat hópa ræðst af einingafjölda, sýnidæmi, kennslustundum (á viku), lengd kennslustundar, hópastærð og skerðingum vegna endurtekninga. Hér er einnig boðið þann möguleika að skerða vinnumat hlutfallslega (%). Útreikningar á vinnumati hvers hóps miðast við 15 vikur. Vinnumat B-hluta er 360 tímar á ári fyrir kennara í fullu starfi eða 180 tíma á misseri. C-hlutinn tekur svo til til allra annarra starfa sem kennari sinnir. Hægt er að nota síðuna til þess að reikna vinnumat stakra áfanga eða fleiri. Flestar samtölur fyrir kennara miðast við kennara í fullu starfi.
        		</p>
        		<TeacherForm/>
      		</div>
      	</div>
    );
  }
}

export default App;
