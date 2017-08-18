import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

/**
* This component was constructed by Unnar Thor Bachmann.
* Some of the code is under heavy influence from the video
* lectures.
* This component renders the search list.
**/
class TeacherForm extends React.Component  {

  launaflokkar = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
  state = {
    aldur: '30 ára-',
    cHluti: '0',
    launaflokkur: '',
    threp: '',
    vikur: '15'
  }

  handleChangeAldur = (e) => {
    this.setState({aldur: e.target.value });
  }

  handleChangeC = (e) => {
    this.setState({cHluti: e.target.value.replace(',','.') });
    this.props.changeDisableButton(this.state,'cHluti',e.target.value);

  }
  handleChangeLaunaflokkur = (e) => {
    this.setState({launaflokkur: e.target.value });
  }
  handleChangeThrep = (e) => {
    this.setState({threp: e.target.value });
  }
  
  getValidationCHluti = () => {
    return (isNaN(this.state.cHluti.replace(',','.')) || this.state.cHluti.trim() === '')? 'error': 'success'
  }

  render() {
    return (
      <div className="BorderTeacherForm">
        <h4>Um kennarann</h4>

      <div className="TeacherForm">
        <div className="TeacherUnitForm">
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState='success'
            >
              <ControlLabel>Aldur: </ControlLabel>
              <FormControl 
                componentClass="select" 
                placeholder="30 ára-"
                value={this.state.aldur}
                onChange={this.handleChangeAldur}
              >
                <option value="30 ára-">30 ára-</option>
                <option value="30-37 ára">30-37 ára</option>
                <option value="38-54 ára">38-54 ára</option>
                <option value="38-54 ára">55-60 ára</option>
                <option value="38-54 ára">60 ára+</option>
                <option value="38-54 ára">60 ára+ (17 tímar)</option>
              </FormControl>
              <HelpBlock>Fyrir rétta vinnuskyldu</HelpBlock>
            </FormGroup>
          </form>
        </div>
        <div className="TeacherUnitForm">
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationCHluti()}
            >
            <ControlLabel>C-hluti: </ControlLabel>
            <FormControl
              type="text"
              value={this.state.cHluti}
              placeholder={this.state.cHluti}
              onChange={this.handleChangeC}
            />
             <FormControl.Feedback />
              <HelpBlock>Allt annað en kennsla.</HelpBlock>
            </FormGroup>
          </form>
        </div>
       
        <div className="TeacherUnitForm">
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={'success'}
            >
            <ControlLabel>Launaflokkur: </ControlLabel>
            <FormControl 
                componentClass="select" 
                placeholder="1"
                value={this.state.launaflokkur}
                onChange={this.handleChangeLaunaflokkur}
            >
            {
              this.launaflokkar.map((flokkur)=> 
                  <option key={flokkur} value={flokkur}>{flokkur}</option>
              )
            }
            </FormControl>
            <HelpBlock>Ef þú villt rétta launaútreikninga.</HelpBlock>
            </FormGroup>
          </form>
        </div>
        <div className="TeacherUnitForm">
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={'success'}
            >
            <ControlLabel>Þrep: </ControlLabel>
            <FormControl 
                componentClass="select" 
                placeholder="1"
                value={this.state.threp}
                onChange={this.handleChangeThrep}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </FormControl>
            <HelpBlock>Ef þú villt rétta launaútreikninga.</HelpBlock>
            </FormGroup>
          </form>
        </div>
      </div>
      </div>
    );
  }
  
}

export default TeacherForm
