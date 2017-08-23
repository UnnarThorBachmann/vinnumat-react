import React, { Component } from 'react';
import logo from './logo.svg';
import TeacherForm from './TeacherForm'
import CourseForm from './CourseForm'
import Media from 'react-bootstrap/lib/Media';
import './App.css';
import Afangi from './afangi.js';
import AfangiComponent from './afangiComponent';

class App extends Component {

  state = {disableTeacher: false,
  			disableCourse: true,
  			teacher: {afangar: []}
  }

  add = (state) => {
  	let afangi = new Afangi(state);
  	this.setState((state) => {teacher: {afangar: this.state.teacher.afangar.push(afangi.vinnumat())}});
  	console.log(this.state.teacher.afangar);
  }

  changeDisableButton= (state,changedProp, value) => {
  	

  	if (changedProp === 'cHluti') {
  		if (isNaN(value) || value.trim() === '')
  			this.setState({disableTeacher: true});
  		else
  			this.setState({disableTeacher: false});	
  	}
  	else {
  		let disabled = false;
  		for (const prop in state) {
  			const val = (prop===changedProp) ? value : state[prop];

  			if (prop === 'heiti' && val ==='') {
  				this.setState({disableCourse: true}); 
  				disabled= true;
  			}
  			else if (prop ==='einingar' && (val ==='' || isNaN(val.replace(',','.')))) {
  				this.setState({disableCourse: true}); 
  				disabled= true;
  			}
  			else if (prop === 'kstundirAviku' && (val ==='' || isNaN(val.replace(',','.')))) {
  				this.setState({disableCourse: true}); 
  				disabled= true;
  			}
  			else if (prop === 'hlutfall' && (val ==='' || isNaN(val.replace(',','.')) 
  													   || parseFloat(val.replace(',','.'))<0 
  													   || parseFloat(val.replace(',','.'))> 100)) {
  				this.setState({disableCourse: true}); 
  				disabled= true;
  			}
  			else if (prop === 'lengdKennslustunda' && (val ==='' || isNaN(val.replace(',','.')))) {
  				this.setState({disableCourse: true}); 
  				disabled= true;
  			}

  		}
  		if (changedProp === 'hopar') {
  			let groups = state['hopar'];
  			groups[value[0]] = value[1];
  			groups = groups.slice(0,groups.length-1);

  			if (groups[groups.length-1] === '')
  				groups = groups.slice(0,groups.length-1);

  			if (groups.length === 0) {
  				this.setState({disableCourse: true}); 
  				disabled= true;
  			}

  			for (let hopur of groups) {
  				if (isNaN(hopur.replace(',','.')) || hopur === '' || parseFloat(hopur.replace(',','.'))< 0) {
  					this.setState({disableCourse: true}); 
  					disabled= true;
  						
  				}
  			}
  		}
  		if (!disabled) 
  			this.setState({disableCourse: false});

  	}

  }
  
  render() {
  	

    return (
     	<div className="App">
    		<div className="App-header">
    			<div className='left'>
    				<img src={logo} className="App-logo" alt="Image"/>
    				<span className="header">Vinnumat</span>
    			</div>

        	</div>
        	<div className="mainBody">
        		{/*
        		<p className="App-intro">
          			Vinnumat kennara skiptist í A-, B- og C-hluta. Vinnumat A-hluta ræðst af vinnumati hópa sem kennari kennir. Vinnumat hópa ræðst af einingafjölda, sýnidæmi, kennslustundum (á viku), lengd kennslustundar, hópastærð og skerðingum vegna endurtekninga. Hér er einnig boðið þann möguleika að skerða vinnumat hlutfallslega (%). Útreikningar á vinnumati hvers hóps miðast við 15 vikur. Vinnumat B-hluta er 360 tímar á ári fyrir kennara í fullu starfi eða 180 tíma á misseri. C-hlutinn tekur svo til til allra annarra starfa sem kennari sinnir. Hægt er að nota síðuna til þess að reikna vinnumat stakra áfanga eða fleiri. Flestar samtölur fyrir kennara miðast við kennara í fullu starfi.
        		</p>*/}
        		<TeacherForm changeDisableButton={this.changeDisableButton}/>
        		<CourseForm changeDisableButton={this.changeDisableButton} add={this.add} disable={this.state.disableTeacher || this.state.disableCourse}/>
      			{
      				this.state.teacher.afangar.map((i,afangi)=> <AfangiComponent/>)
      			}
      		</div>
      	</div>
    );
  }
}

export default App;
