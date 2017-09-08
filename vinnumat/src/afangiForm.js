import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import HlutfallForm from './HlutfallForm'
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

class AfangiForm extends React.Component  {


	changeHlutfall = (gildi, heiti,nr) => {
		this.props.changeHlutfall(gildi,heiti,nr);
	}

	destroy = () => {
		this.props.destroy(this.props.afangi.heiti);
	}
    
	render() {
        const tooltip = (<Tooltip id="tooltip"><strong>Eyða</strong></Tooltip>);
    	return (
    		<div className="afangiRammi">
                <OverlayTrigger placement="left" overlay={tooltip} rootClose={true}>
                    <Button className="takki" bsStyle="danger" disabled={false} onClick={this.destroy}><span className="glyphicon glyphicon-minus"></span></Button>
    		    </OverlayTrigger>
            <h4><strong>Heiti: {this.props.afangi.heiti}</strong></h4>
    		<Row>
    			<Col xs={12} md={2}>
    			 <h5><strong>Innslegnir stikar</strong></h5>
    			 <ListGroup>
    				<ListGroupItem>Einingar: {this.props.afangi.einingar}</ListGroupItem>
    				<ListGroupItem>Kennslustundir á viku: {this.props.afangi.kstundirAviku}</ListGroupItem>
    				<ListGroupItem>Lengd kennslustunda: {this.props.afangi.lengdKennslustunda} mín</ListGroupItem>
    				<ListGroupItem>Sýnidæmi: {this.props.afangi.synidaemiHeiti}</ListGroupItem>
    				<ListGroupItem>Kennsluvikur: {this.props.afangi.vikur}</ListGroupItem>
                    {
                        this.props.afangi.skiptitimar && <ListGroupItem>Skiptitimar: {this.props.afangi.skiptitimar} mín</ListGroupItem>

                    }
    			 </ListGroup>
    			</Col>
    			<Col xs={12} md={3}>
    			 <h5><strong>Sundurliðun vinnumats (stakur hópur)</strong></h5>
    			 <ListGroup>
    				<ListGroupItem>Staðin kennsla: {this.props.afangi.vinnumat_hopa[0].vinna_stadin} klst.</ListGroupItem>
    				<ListGroupItem>Undirbúningur kennslu: {this.props.afangi.vinnumat_hopa[0].vinna_undirbuningur.toString().replace('.',',')} klst.</ListGroupItem>
    				<ListGroupItem>Fastur hluti: {this.props.afangi.vinnumat_hopa[0].vinna_fastur.toFixed(1).toString().replace('.',',')} klst.
    				<ul>
                        <li>Námsáætlun: {this.props.afangi.namsaetlun.toFixed(1).toString().replace('.',',')} klst.</li>
                        <li>Verkefnisgerð: {this.props.afangi.verkefnisgerd.toFixed(1).toString().replace('.',',')} klst.</li>
                        <li>Önnur vinna {this.props.afangi.onnur_vinna.toFixed(1).toString().replace('.',',')} klst.</li>
                    </ul>
                    </ListGroupItem>
                    {this.props.afangi.vinnumat_hopa[0].hasOwnProperty('skerding') &&
    		    			<ListGroupItem>Skerðing: -{this.props.afangi.vinnumat_hopa[0].skerding.toFixed(1).toString().replace('.',',')} klst. </ListGroupItem>
					}
					{this.props.afangi.vinnumat_hopa[0].hasOwnProperty('skerdingarprosenta') &&
    		    			<ListGroupItem>Hlutfallsleg skerðing: {(this.props.afangi.vinnumat_hopa[0].skerdingarprosenta*100).toFixed(1).toString().replace('.',',')} %</ListGroupItem>
					}
					

    			 </ListGroup>
    			</Col>
                {

                    this.props.afangi.vinnumat_hopa.length > 1 && 
                    <Col xs={12} md={2}>

                 <h5><strong>Samtölur</strong></h5>
                    <ListGroup>
                    <ListGroupItem>Skerðingar: -{this.props.afangi.vinnumat_hopa.reduce(function(a,b){
                        if (b.hasOwnProperty('skerding'))
                            return a + b.skerding;
                        else
                            return a + 0;
                    },0).toFixed(1).toString().replace('.',',')} klst.
                    </ListGroupItem>

                    <ListGroupItem>Vinnumat: {this.props.afangi.vinnumat_hopa.reduce(function(a,b){

                        return a + b.vinnumat_skert;
                    },0).toFixed(1).toString().replace('.',',')} klst.</ListGroupItem>

                    </ListGroup>
                
                </Col>
                }
    						
                {
    				this.props.afangi.vinnumat_hopa.map((hopur) => 
                        <Col xs={12} md={2} key={hopur.hopur}>
        					<h5><strong>Hópur: {hopur.hopur}</strong></h5>
    						<ListGroup>
        						<ListGroupItem>Fjöldi: {hopur.fjoldi.toString().replace('.',',')}</ListGroupItem>
    	       					<ListGroupItem>Vinna vegna nemenda: {hopur.vinna_vegna_nemenda.toFixed(1).toString().replace('.',',')} klst.</ListGroupItem>
    			     			<ListGroupItem>Vinnumat: {hopur.vinnumat_skert.toFixed(2).toString().replace('.',',')} klst.</ListGroupItem>		
        						{
                                    hopur.skiptitimar !== 0 && <ListGroupItem>Skiptitímar: {hopur.skiptitimar.toFixed(1).toString().replace('.',',')} klst.</ListGroupItem>
                                }
                                <ListGroupItem><HlutfallForm hlutfall={hopur.hlutfall} nr={hopur.hopur} changeHlutfall = {this.changeHlutfall} heiti={this.props.afangi.heiti}/></ListGroupItem>

                            </ListGroup>					
    					</Col>
    				)
    			}
    		</Row>
    		</div>
    	)

	}
}

export default AfangiForm