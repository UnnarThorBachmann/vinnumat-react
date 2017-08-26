import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';


class AfangiComponent extends React.Component  {

	render() {
		console.log(this.props.afangi);
    	return (
    		<div className="nidurstadaAfanga">
    			<h4>Heiti:{this.props.afangi.heiti}</h4>
    			<ListGroup>
    				<ListGroupItem>Einingar: {this.props.afangi.einingar}</ListGroupItem>
    			</ListGroup>
    		</div>
    	)

	}
}

export default AfangiComponent 