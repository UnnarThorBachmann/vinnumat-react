import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';




class TeacherForm extends React.Component  {

  launaflokkar = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
  threp = ['0','1','2','3','4','5','6','7','8']
  starfshlutfall = ['100',
                    '99',
                    '98',
                    '97',
                    '96',
                    '95',
                    '94',
                    '93',
                    '92',
                    '91',
                    '90',
                    '89',
                    '88',
                    '87',
                    '86',
                    '85',
                    '84',
                    '83',
                    '82',
                    '81',
                    '80',
                    '79',
                    '78',
                    '77',
                    '76',
                    '75',
                    '74',
                    '73',
                    '72',
                    '71',
                    '70',
                    '69',
                    '68',
                    '67',
                    '66',
                    '65',
                    '64',
                    '63',
                    '62',
                    '61',
                    '60',
                    '59',
                    '58',
                    '57',
                    '56',
                    '55',
                    '54',
                    '53',
                    '52',
                    '51',
                    '50',
                    '49',
                    '48',
                    '47',
                    '46',
                    '45',
                    '44',
                    '43',
                    '42',
                    '41',
                    '40',
                    '39',
                    '38',
                    '37',
                    '36',
                    '35',
                    '34',
                    '33',
                    '32',
                    '31',
                    '30',
                    '29',
                    '28',
                    '27',
                    '26',
                    '25'
  ]
  aldur = ["30 ára-",
            "30-37 ára", 
            "38-54 ára",
            "55-60 ára",
            "60 ára+",
            "60 ára+ (17 tímar)"
  ]
  state = {
    aldur: '30 ára-',
    cHluti: '0',
    launaflokkur: '1',
    threp: '0',
    starfshlutfall: '100'
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
  handleChangeStarfshlutfall = (e) => {
    console.log(e.target.value);
    this.setState({starfshlutfall: e.target.value});
    this.props.changeTeacher({'starfshlutfall': e.target.value});
  }
  
  getValidationCHluti = () => {
    return (isNaN(this.state.cHluti.replace(',','.')) || this.state.cHluti.trim() === '')? 'error': 'success'
  }
  /*
  <Col xs={12} md={2}>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState='success'
            >
              <ControlLabel>Ráðningarhlutfall (%): </ControlLabel>
              <FormControl 
                componentClass="select" 
                placeholder="100"
                value={this.state.starfshlutfall}
                onChange={this.handleChangeStarfshlutfall}
              >
              {
                this.starfshlutfall.map((item)=> <option key={item} value={item}>{item}</option>)
              }
             
              </FormControl>
            </FormGroup>
          </form>
        </Col>
  */

  render() {
    return (
      <div className="BorderTeacherForm">
      <Grid>
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
              {
                this.aldur.map((item)=> <option key={item} value={item}>{item}</option>)
              }
             
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
            <HelpBlock>Fyrir upplýsingar um grunnlaun.</HelpBlock>
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
            <HelpBlock>Fyrir upplýsingar um grunnlaun.</HelpBlock>
            </FormGroup>
          </form>
        </Col>
      </Row>
      </Grid>
      </div>
    );
  }
  
}

export default TeacherForm
