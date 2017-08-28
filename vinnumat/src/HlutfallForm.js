import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';

class HlutfallForm extends React.Component  {

  state = {hlutfall: this.props.hlutfall}

  plus = () => {
    if (this.state.hlutfall < 100) {
      this.setState(state=> {return {hlutfall: (state.hlutfall + 1)}});
      this.props.changeHlutfall(this.state.hlutfall + 1,this.props.heiti, this.props.nr);
    }
  }

  minus = ()=> {
    if (this.state.hlutfall > 0) {
      this.setState(state=> {return {hlutfall: (state.hlutfall - 1)}});
      this.props.changeHlutfall(this.state.hlutfall - 1,this.props.heiti,this.props.nr);
    }
  }

  render() {
    return (
          <div className="hlutfallsbord">
            <span className="hlutfall-gildi">{this.state.hlutfall} %</span>
            <div>
              <Button className="takki-min" bsSize="xsmall" bsStyle="primary" disabled={false} onClick={this.minus}><span className="glyphicon glyphicon-chevron-left"></span></Button>
              <Button className="takki-min" bsSize="xsmall" bsStyle="primary" disabled={false} onClick={this.plus}><span className="glyphicon glyphicon-chevron-right"></span></Button>
            </div>
          </div>
    );
  }
  
}

export default HlutfallForm
