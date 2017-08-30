import React, { Component } from 'react';
import TeacherForm from './TeacherForm'
import CourseForm from './CourseForm'
import Media from 'react-bootstrap/lib/Media';
import './App.css';
import Afangi from './afangi.js';
import AfangiForm from './afangiForm';
import KennariForm from './kennariForm';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
//import logo from './logo.svg';
import logo from './logo-100.png';

class App extends Component {

  state = {disableTeacher: false,
  			disableCourse: true,
  			teacher: {afangar: new Map(),
  						aldur: '30 ára-',
    					cHluti: '0',
    					launaflokkur: '1',
    					threp: '0'
    				}
  }
  destroy = (heiti) => {
  	
  	this.setState(state => {
  		state.teacher.afangar.delete(heiti);
  		return {teacher: {afangar: state.teacher.afangar,
  						  aldur: state.teacher.aldur,
  						  cHluti: state.teacher.cHluti,
  						  launaflokkur: state.teacher.launaflokkur,
  						  threp: state.teacher.threp
  		}};
  	});

  }

  changeTeacher = (object_changed) => {
  	
  	let state_changed = this.state;
  	if (object_changed.hasOwnProperty('aldur'))
  		state_changed.teacher['aldur'] = object_changed['aldur'];
  	else if (object_changed.hasOwnProperty('cHluti'))
  		state_changed.teacher['cHluti'] = object_changed['cHluti'];
  	else if (object_changed.hasOwnProperty('launaflokkur'))
  		state_changed.teacher['launaflokkur'] = object_changed['launaflokkur'];
  	else if (object_changed.hasOwnProperty('threp'))
  		state_changed.teacher['threp'] = object_changed['threp'];

  	this.setState((state) => {teacher: state_changed.teacher});
  }

  changeHlutfall = (gildi,heiti,nr) => {
  	
  	let afangi_change = this.state.teacher.afangar.get(heiti);
  	afangi_change.vinnumat_hopa[parseInt(nr-1)].hlutfall = parseInt(gildi);
	  afangi_change.vinnumat_hopa[parseInt(nr-1)].fradrattur = parseFloat(afangi_change.vinnumat_hopa[parseInt(nr-1)].vinnumat)*(100-parseFloat(gildi))/100;
  	afangi_change.vinnumat_hopa[parseInt(nr-1)].vinnumat_skert = parseFloat(afangi_change.vinnumat_hopa[parseInt(nr-1)].vinnumat) - parseFloat(afangi_change.vinnumat_hopa[parseInt(nr-1)].fradrattur);
  	  	
  	this.setState(state => {
  		state.teacher.afangar.set(heiti,afangi_change);
  		return {teacher: {afangar: state.teacher.afangar,
  						  aldur: state.teacher.aldur,
  						  cHluti: state.teacher.cHluti,
  						  launaflokkur: state.teacher.launaflokkur,
  						  threp: state.teacher.threp
  		}};
  	});

  }
  add = (state) => {
  	let afangi = new Afangi(state);
  	let afangi_nidurstodur = afangi.vinnumat();
  	this.setState((state) => {teacher: {afangar: this.state.teacher.afangar.set(afangi_nidurstodur.heiti,afangi_nidurstodur)}});
    this.setState({disableCourse: true});
  	
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
  /*<img src={logo} className="App-logo" alt="Image"/>*/
  /*<Icon className='normal' />;*/
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
        		<Tabs defaultActiveKey={1} id="tabbar">
    				<Tab eventKey={1} title="Um kennarann">
    					<TeacherForm changeDisableButton={this.changeDisableButton} changeTeacher = {this.changeTeacher}/>
					</Tab>
    				<Tab eventKey={2} title="Bæta við áfanga">
        				<CourseForm changeDisableButton={this.changeDisableButton} add={this.add} disable={this.state.disableTeacher || this.state.disableCourse}/>
    				</Tab>
    				<Tab eventKey={3} title="Niðurstöður áfanga">
    					{
      				
      						[...this.state.teacher.afangar.values()].map((afangi)=> <AfangiForm key={afangi.heiti} afangi={afangi} destroy ={this.destroy} changeHlutfall={this.changeHlutfall}/>)
      					}
    				</Tab>
    				<Tab eventKey={4} title="Niðurstöður kennara">
    					<KennariForm kennari={this.state.teacher}/>
    				</Tab>
  				</Tabs>   			
      		</div>
      	</div>
    );
  }
}

export default App;
