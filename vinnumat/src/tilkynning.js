import React, {Component,Delay} from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
class Tilkynning extends React.Component  {

  /*
	<Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Vistaði {this.props.heiti}!</Modal.Title>
        </Modal.Header>
        
      </Modal>
  */
  state = {loading: true}

  componentDidMount() {
  	var self = this;
  	setTimeout(() => {
  		self.setState({loading: false});
  		self.props.loka();
  	}, 2000);
  }
  render() {
  	if (this.state.loading) {
  		return (
    	
        	<Alert bsStyle="success">
    			<strong>Sjá niðurstöður!</strong> 
  			</Alert>
    	);

  	}
    else 
    	return null;
}
}
export default Tilkynning