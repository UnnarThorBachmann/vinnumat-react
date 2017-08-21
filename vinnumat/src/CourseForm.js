import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import HopurForm from './HopurForm';
import Button from 'react-bootstrap/lib/Button';
/**
* This component was constructed by Unnar Thor Bachmann.
* Some of the code is under heavy influence from the video
* lectures.
* This component renders the search list.
**/
class CourseForm extends React.Component  {

  afangaHeiti = ['Almenn braut',
            'Fagbóklegt',
            'Félagsgreinar',
            'Hægferð',
            'Íslenska',
            'Íþróttafræði',
            'Íþróttir',
            'Listgreinar',
            'Raungreinar',
            'Sjúkraliðanám',
            'Starfsbraut (1/3)',
            'Starfsbraut (4/6)',
            'Starfsbraut (7/12)',
            'Stærðfræði',
            'Tölvuáfangar',
            'Tungumál',
            'Verklegt'] 

  kennsluvikur = ['14',
                  '15',
                  '16',
                  '17',
                  '18']
  
  state = {
    heiti: '',
    vikur: '15',
    einingar: '3',
    synidaemi: 'Almenn braut',
    kstundirAviku: '6',
    lengdKennslustunda: '40',
    hlutfall: '100',
    hopar: ['25','']
  }

  handleChangeHeiti = (e) => {  
    console.log(this.state.hopar);  
    this.setState({heiti: e.target.value });
    this.props.changeDisableButton(Object.assign({},this.state),'heiti',e.target.value);
  }
  handleChangeEiningar = (e) => {
    this.setState({einingar: e.target.value });
    this.props.changeDisableButton(this.state,'einingar',e.target.value);
  }
 
  handleChangeVikur = (e) => {
    this.setState({vikur: e.target.value });
  }

  handleChangeSynidaemi = (e) => {
    this.setState({synidaemi: e.target.value });
  }

  handleChangeKstundirAviku = (e) => {
    this.setState({kstundirAviku: e.target.value });
    this.props.changeDisableButton(this.state,'kstundirAviku',e.target.value);

  }
  handleChangeLengdKennslustunda = (e) => {
    this.setState({lengdKennslustunda: e.target.value });
    this.props.changeDisableButton(this.state,'kstundirAviku',e.target.value);

  }
  handleChangeHlutfall = (e) => {
    this.setState({hlutfall: e.target.value });
    this.props.changeDisableButton(this.state,'hlutfall',e.target.value);

  }

  
  getValidationHeiti = () => {
   
    return (this.state.heiti.trim() === '') ? 'error': 'success';
  }

  getValidationKstundirAviku = () => {
    if (this.state.kstundirAviku.trim() === '')
      return 'error';
    else if (isNaN(this.state.kstundirAviku.replace(',','.')))
      return 'error'
    else
      return 'success';
  }

  getValidationEiningar = () => {
    
    if (this.state.einingar.trim() === '')
      return 'error';
    else if (isNaN(this.state.einingar.replace(',','.')))
      return 'error'
    else
      return 'success';

  }


  getValidationLengdKennslustunda = () => {
    if (this.state.lengdKennslustunda.trim() === '')
      return 'error';
    else if (isNaN(this.state.lengdKennslustunda.trim().replace(',','.')))
      return 'error'
    else
      return 'success';
  }

  getValidationHlutfall = () => {
    let hlutfall = this.state.hlutfall.trim().replace(',','.');

    if (hlutfall === '')
      return 'error';
    else if (isNaN(hlutfall))
      return 'error'
    else if (parseFloat(hlutfall) < 0 || parseFloat(hlutfall) > 100)
      return 'error'
    else
      return 'success';
  }

  changeHopar = (index,value) => {
    
    this.setState((state)=>{
      
      state.hopar[index] = value;
      if (state.hopar.length === (index+1) && !isNaN(value) && value.trim() !== '')
        state.hopar.push('');
      else if (state.hopar.length === (index+2) && value.trim() === '' && state.hopar.length > 2)
        state.hopar = state.hopar.slice(0,state.hopar.length-1);
      return state;
    })

    this.props.changeDisableButton(this.state,'hopar',[index,value]);

  
  }
  
  render() {
    return (
      <div className="BorderCourseForm">
        <Button className="takki" bsStyle="success" disabled={this.props.disable}><span className="glyphicon glyphicon-plus"></span></Button>
        <h4>Um áfanga</h4>

        <div className="CourseForm">
          <div className="CourseUnitForm">
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationHeiti()}
              >
              <ControlLabel>Heiti: </ControlLabel>
              <FormControl
                type="text"
                value={this.state.heiti}
                placeholder={this.state.heiti}
                onChange={this.handleChangeHeiti}
              />
              <FormControl.Feedback />
              <HelpBlock>Heiti áfanga.</HelpBlock>
              </FormGroup>
            </form>
          </div>
          <div className="CourseUnitFormMin">
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={'success'}
              >
                <ControlLabel>Kennsluvikur: </ControlLabel>
                <FormControl 
                  componentClass="select" 
                  placeholder={this.state.vikur}
                  value={this.state.vikur}
                  onChange={this.handleChangeVikur}
                >
                {
                  this.kennsluvikur.map((vika)=>
                    <option key={vika} value={vika}>{vika}</option>

                  )
                }
                </FormControl>
                <HelpBlock>15 vikur skv. sýnidæmum</HelpBlock>
              </FormGroup>
            </form>
          </div>
          <div className="CourseUnitFormMin">
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationEiningar()}
              >
              <ControlLabel>Einingar: </ControlLabel>
              <FormControl
                type="text"
                value={this.state.einingar}
                placeholder={this.state.einingar}
                onChange={this.handleChangeEiningar}
              >
              </FormControl>

              <FormControl.Feedback />
              <HelpBlock><strong>5 feiningar oftast 3 einingar</strong></HelpBlock>
              </FormGroup>
            </form>
          </div>
          <div className="CourseUnitForm">
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={'success'}
              >
                <ControlLabel>Sýnidæmi: </ControlLabel>
                <FormControl 
                  componentClass="select" 
                  placeholder={this.state.synidaemi}
                  value={this.state.synidaemi}
                  onChange={this.handleChangeSynidaemi}
                >
                {
                  this.afangaHeiti.map((heiti) =>
                    <option key= {heiti} value={heiti}>{heiti}</option>
                  )
                }
                </FormControl>
              </FormGroup>
            </form>
          </div>
          <div className="CourseUnitFormMin">
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationKstundirAviku()}
              >
              <ControlLabel>Kennslustundir: </ControlLabel>
              <FormControl
                type="text"
                value={this.state.kstundirAviku}
                placeholder={this.state.kstundirAviku}
                onChange={this.handleChangeKstundirAviku}
              />
              <FormControl.Feedback />
              <HelpBlock>Á viku</HelpBlock>

              </FormGroup>
            </form>
          </div>
          <div className="CourseUnitFormMin">
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationLengdKennslustunda()}
              >
              <ControlLabel>Lengd: </ControlLabel>
              <FormControl
                type="text"
                value={this.state.lengdKennslustunda}
                placeholder={this.state.lengdKennslustunda}
                onChange={this.handleChangeLengdKennslustunda}
              />
              <FormControl.Feedback />
              <HelpBlock>Í mínútum</HelpBlock>
              </FormGroup>
            </form>
          </div>
           <div className="CourseUnitFormMin">
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationHlutfall()}
              >
              <ControlLabel>Hlutfall (%): </ControlLabel>
              <FormControl
                type="text"
                value={this.state.hlutfall}
                placeholder={this.state.hlutfall}
                onChange={this.handleChangeHlutfall}
              />
              <FormControl.Feedback />
              <HelpBlock>Ef kennt er á móti öðrum.</HelpBlock>
              </FormGroup>
            </form>
          </div>
          <div className="CourseUnitForm">
            <form>
              <ControlLabel style={{color: '#3c763d'}}>Hópar: </ControlLabel>
              {
                this.state.hopar.map((fjoldi,i) => <HopurForm key={i} index={i} fjoldi={fjoldi} change={this.changeHopar} end={i === (this.state.hopar.length-1)} size={this.state.hopar.length}/>)
              }
            </form>
          </div>                          
        </div>
      </div>
    );
  }
  
}

export default CourseForm
