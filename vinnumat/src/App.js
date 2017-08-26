import React, { Component } from 'react';
import logo from './logo.svg';
import TeacherForm from './TeacherForm'
import CourseForm from './CourseForm'
import Media from 'react-bootstrap/lib/Media';
import './App.css';
import Afangi from './afangi.js';
import AfangiComponent from './afangiComponent';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';


class App extends Component {

  state = {disableTeacher: false,
  			disableCourse: true,
  			teacher: {afangar: new Map()}
  }

  add = (state) => {
  	let afangi = new Afangi(state);
  	let afangi_nidurstodur = afangi.vinnumat();
  	this.setState((state) => {teacher: {afangar: this.state.teacher.afangar.set(afangi_nidurstodur.heiti,afangi_nidurstodur)}});
  	
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
  			groups = groups.slice(0,groups.length);

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
        		<Tabs defaultActiveKey={1}>
    				<Tab eventKey={1} title="Um kennarann">
    					<TeacherForm changeDisableButton={this.changeDisableButton}/>
					</Tab>
    				<Tab eventKey={2} title="Bæta við áfanga">
        				<CourseForm changeDisableButton={this.changeDisableButton} add={this.add} disable={this.state.disableTeacher || this.state.disableCourse}/>
    				</Tab>
    				<Tab eventKey={3} title="Niðurstöður">
    					{
      				
      						[...this.state.teacher.afangar.values()].map((afangi)=> <AfangiComponent key={afangi.heiti} afangi={afangi}/>)
      				
      					}
    				</Tab>
  				</Tabs>
      			
      		</div>
      	</div>
    );
  }
}

export default App;
