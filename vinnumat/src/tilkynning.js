import React, {Component} from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class Tilkynning extends React.Component  {

  render() {
    return (
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Vistaði {this.props.heiti}!</Modal.Title>
        </Modal.Header>
        
      </Modal>
    );
}
}
export default Tilkynning