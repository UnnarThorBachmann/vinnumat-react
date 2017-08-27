import React, {Component} from 'react';

class HlutfallForm extends React.Component  {

  
  plus = () => {

    console.log('plus');
  }

  render() {
    return (
          <Button className="takki" bsStyle="success" disabled={false} onClick={this.plus}><span className="glyphicon glyphicon-chevron-right"></span></Button>
    );
  }
  
}

export default HlutfallForm
