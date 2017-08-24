import React, {Component} from 'react';

import Well from 'react-bootstrap/lib/Well';

class AfangiComponent extends React.Component  {

	render() {
		console.log(this.props.afangi);
    	return (
    		<div>
    			<Well>
    				<h2>{this.props.afangi.heiti}</h2>
    			</Well>
    		</div>
    	)

	}
}

export default AfangiComponent 