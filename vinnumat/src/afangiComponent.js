import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import HlutfallForm from './HlutfallForm'

class AfangiComponent extends React.Component  {

	changeHlutfall = (gildi, heiti,nr) => {
		this.props.changeHlutfall(gildi,heiti,nr);
	}

	render() {
    	return (
    		<div className="afangiRammi">
    		<h4>Heiti: {this.props.afangi.heiti}</h4>

    		<div className="nidurstadaAfanga">
    			<div className="listarNidurstodur">
    			<h5><strong>Innslegnir stikar</strong></h5>
    			<ListGroup>
    				<ListGroupItem>Einingar: {this.props.afangi.einingar}</ListGroupItem>
    				<ListGroupItem>Kennslustundir á viku: {this.props.afangi.kstundirAviku}</ListGroupItem>
    				<ListGroupItem>Lengd kennslustunda: {this.props.afangi.lengdKennslustunda} mín</ListGroupItem>
    				<ListGroupItem>Sýnidæmi: {this.props.afangi.synidaemiHeiti}</ListGroupItem>
    				<ListGroupItem>Kennsluvikur: {this.props.afangi.vikur}</ListGroupItem>
    			</ListGroup>
    			</div>
    			<div className="listarNidurstodur">

    			<h5><strong>Niðurstöður</strong></h5>
    			<ListGroup>
    				<ListGroupItem>Staðin kennsla: {this.props.afangi.vinnumat_hopa[0].vinna_stadin} klst.</ListGroupItem>
    				<ListGroupItem>Undirbúningur: {this.props.afangi.vinnumat_hopa[0].vinna_undirbuningur.toString().replace('.',',')} klst.</ListGroupItem>
    				<ListGroupItem>Fastur hluti: {this.props.afangi.vinnumat_hopa[0].vinna_fastur} klst.</ListGroupItem>
    				{this.props.afangi.vinnumat_hopa[0].hasOwnProperty('skerding') &&
    		    			<ListGroupItem>Skerðing: {this.props.afangi.vinnumat_hopa[0].skerding.toFixed(1).toString().replace('.',',')} klst. </ListGroupItem>
					}
					{this.props.afangi.vinnumat_hopa[0].hasOwnProperty('skerdingarprosenta') &&
    		    			<ListGroupItem>-{(this.props.afangi.vinnumat_hopa[0].skerdingarprosenta*100).toFixed(1).toString().replace('.',',')} %</ListGroupItem>
					}
    			</ListGroup>
    			</div>
    			{
    				this.props.afangi.vinnumat_hopa.map((hopur) => 
    					<div className="listarNidurstodur" key={hopur.hopur}>
    					<h5><strong>Hópur: {hopur.hopur}</strong></h5>
						<ListGroup>
    						<ListGroupItem>Fjöldi: {hopur.fjoldi.toString().replace('.',',')}</ListGroupItem>
    						<ListGroupItem>Vinna vegna nemenda: {hopur.vinna_vegna_nemenda.toFixed(1).toString().replace('.',',')} klst.</ListGroupItem>
    						<ListGroupItem>Vinnumat: {hopur.vinnumat_skert.toFixed(2).toString().replace('.',',')} klst.</ListGroupItem>
    						{hopur.hasOwnProperty('fradrattur') &&
    		    				<ListGroupItem>-{hopur.fradrattur.toFixed(1).toString().replace('.',',')} klst.</ListGroupItem>
							}
    						<ListGroupItem><HlutfallForm hlutfall={hopur.hlutfall} nr={hopur.hopur} changeHlutfall = {this.changeHlutfall} heiti={this.props.afangi.heiti}/></ListGroupItem>
 
    					</ListGroup>
    					
    					</div>
    				)
    			}
    		</div>
    		</div>
    	)

	}
}

export default AfangiComponent 