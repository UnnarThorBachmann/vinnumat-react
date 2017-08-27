import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

/**
* This component was constructed by Unnar Thor Bachmann.
* Some of the code is under heavy influence from the video
* lectures.
* This component renders the search list.
**/
class HopurForm extends React.Component  {

  state = {fjoldi: this.props.fjoldi,
            hlutfall: this.props.hlutfall
          }

  getValidationFjoldi = () => {
    if (this.state.fjoldi.trim() === '' && !this.props.end)
      return 'error';
    else if (isNaN(this.state.fjoldi.trim().replace(',','.')))
      return 'error'
    else if (this.props.end)
      return null;
    else
      return 'success';

  }
  handleChangeFjoldi= (e) => {
    this.setState({fjoldi: e.target.value});
    this.props.change(this.props.index, e.target.value);
  }

  render() {
    return (
          <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationFjoldi()}
          >
          <FormControl
            type="text"

            value={this.props.fjoldi}
            placeholder={this.props.fjoldi}
            onChange={this.handleChangeFjoldi}
          />
          <FormControl.Feedback />
          {this.props.end && 
              <HelpBlock><strong>Fjöldi hópa: {this.props.size-1}</strong></HelpBlock>            
          }
          </FormGroup>

    );
  }
  
}

export default HopurForm
