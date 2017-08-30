import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';



class TeacherForm extends React.Component  {

  launaflokkar = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
  threp = ['0','1','2','3','4','5','6','7','8']
  state = {
    aldur: '30 ára-',
    cHluti: '0',
    launaflokkur: '1',
    threp: '0',
  }

  handleChangeAldur = (e) => {
    this.setState({aldur: e.target.value });
    this.props.changeTeacher({'aldur': e.target.value});
  }

  handleChangeC = (e) => {
    this.setState({cHluti: e.target.value.replace(',','.') });
    this.props.changeDisableButton(this.state,'cHluti',e.target.value);
    this.props.changeTeacher({'cHluti': e.target.value});
  }
  handleChangeLaunaflokkur = (e) => {
    this.setState({launaflokkur: e.target.value });
    this.props.changeTeacher({'launaflokkur': e.target.value});
  }

  handleChangeThrep = (e) => {
    console.log(e.target.value);
    this.setState({threp: e.target.value});
    this.props.changeTeacher({'threp': e.target.value});
  }
  
  getValidationCHluti = () => {
    return (isNaN(this.state.cHluti.replace(',','.')) || this.state.cHluti.trim() === '')? 'error': 'success'
  }

  render() {
    return (
      <div className="BorderTeacherForm">

      <Row>
        <Col xs={12} md={3}>
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
                <option value="55-60 ára">55-60 ára</option>
                <option value="60 ára+">60 ára+</option>
                <option value="60 ára+ (17 tímar)">60 ára+ (17 tímar)</option>
              </FormControl>
              <HelpBlock>Fyrir rétta vinnuskyldu</HelpBlock>
            </FormGroup>
          </form>
        </Col>
        <Col xs={12} md={3}>
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
              <HelpBlock>Önnur vinna en kennsla.</HelpBlock>
            </FormGroup>
          </form>
        </Col>
       
        <Col xs={12} md={3}>

          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={'success'}
            >
            <ControlLabel>Launaflokkur: </ControlLabel>
            <FormControl 
                componentClass="select" 
                placeholder={this.state.launaflokkur}
                value={this.state.launaflokkur}
                onChange={this.handleChangeLaunaflokkur}
            >
            {
              this.launaflokkar.map((flokkur)=> 
                  <option key={flokkur} value={flokkur}>{flokkur}</option>
              )
            }
            </FormControl>
            <HelpBlock>Fyrir rétta launaútreikninga.</HelpBlock>
            </FormGroup>
          </form>
        </Col>
        <Col xs={12} md={3}>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={'success'}
            >
            <ControlLabel>Þrep: </ControlLabel>
            <FormControl 
                componentClass="select" 
                placeholder={this.state.threp}
                value={this.state.threp}
                onChange={this.handleChangeThrep}
            >
            {
              this.threp.map((threp)=><option key={threp} value={threp}>{threp}</option>)
            }
            </FormControl>
            <HelpBlock>Fyrir rétta launaútreikninga.</HelpBlock>
            </FormGroup>
          </form>
        </Col>
      </Row>
      </div>
    );
  }
  
}

export default TeacherForm
