import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';


class AfangiComponent extends React.Component  {

	render() {
		console.log(this.props.afangi);
    	return (
    		<div className="nidurstadaAfanga">
    			<h4>Heiti: {this.props.afangi.heiti}</h4>
    			<h5><strong>Innslegnir stikar</strong></h5>
    			<ListGroup>
    				<ListGroupItem>Einingar: {this.props.afangi.einingar}</ListGroupItem>
    				<ListGroupItem>Hlutfall: {this.props.afangi.hlutfall}%</ListGroupItem>
    				<ListGroupItem>Kennslustundir á viku: {this.props.afangi.kstundirAviku}</ListGroupItem>
    				<ListGroupItem>Lengd kennslustunda: {this.props.afangi.lengdKennslustunda} mín</ListGroupItem>
    				<ListGroupItem>Sýnidæmi: {this.props.afangi.synidaemiHeiti}</ListGroupItem>
    				<ListGroupItem>Kennsluvikur: {this.props.afangi.vikur}</ListGroupItem>
    			</ListGroup>
    			<h5><strong>Niðurstöður</strong></h5>
    			<ListGroup>
    				<ListGroupItem>Staðin kennsla: {this.props.afangi.vinnumat_hopa[0].vinna_stadin} klst.</ListGroupItem>
    				<ListGroupItem>Undirbúningur: {this.props.afangi.vinnumat_hopa[0].vinna_undirbuningur} klst.</ListGroupItem>
    				<ListGroupItem>Fastur hluti: {this.props.afangi.vinnumat_hopa[0].vinna_fastur} klst.</ListGroupItem>
    			</ListGroup>
    			{
    				this.props.afangi.vinnumat_hopa.map((hopur) => <ListGroup key={hopur.hopur}>
    					<ListGroupItem>Hópur: {hopur.hopur}</ListGroupItem>
    					<ListGroupItem>Fjöldi: {hopur.fjoldi}</ListGroupItem>
    					<ListGroupItem>Vinna vegna nemenda: {hopur.vinna_vegna_nemenda.toString().replace('.',',')} klst.</ListGroupItem>
    					<ListGroupItem>Vinnumat: {hopur.vinnumat.toString().replace('.',',')} klst.</ListGroupItem>
    					</ListGroup>
    				)
    			}
    		</div>
    	)

	}
}

export default AfangiComponent 