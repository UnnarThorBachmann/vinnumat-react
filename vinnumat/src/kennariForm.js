import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import toflur from './launatoflur.js';

class KennariForm extends React.Component  {
    vinnuskylda = {'30 ára-': 720,
                   '30-37 ára': 708,
                   '38-54 ára': 696,
                    '55-60 ára': 696,
                    '60 ára+': 696,
                    '60 ára+ (17 tímar)': 696}	

    kennsluafslattur = {'55-60 ára': 0.0417,
                        '60 ára+': 0.2083,
                        '60 ára+ (17 tímar)': 0.2919}

    hlutfallAfGrunnlaunum = 0.010385;
	render() {
        let vinnuskylda = this.vinnuskylda[this.props.kennari.aldur];
        let kennsluafslattur = this.kennsluafslattur.hasOwnProperty(this.props.kennari.aldur) ? this.kennsluafslattur[this.props.kennari.aldur]: 0;
        let cHluti = parseFloat(this.props.kennari.cHluti);
        let vinnuskylda_breytt = (vinnuskylda-cHluti) >= 0 ? (vinnuskylda-cHluti):0;
        let vinnumat_a = [...this.props.kennari.afangar.values()].reduce(function(a,b){
                    return a + b.vinnumat_hopa.reduce(function(c,d){return c + d.vinnumat_skert},0);
                 },0);
        let yfirvinna = Math.max(vinnumat_a + cHluti -(vinnuskylda-kennsluafslattur*vinnuskylda_breytt),0);
        let grunnlaun = toflur.launatafla[this.props.kennari.launaflokkur][this.props.kennari.threp];
        let laun_yfirvinna = yfirvinna*this.hlutfallAfGrunnlaunum*grunnlaun;
        let laun_desember = toflur.desemberuppbot['2016'];
        let laun_orlof = toflur.orlofsuppbot['2016'];
        let launaflokkur = this.props.kennari.launaflokkur;
        let threp = this.props.kennari.threp;
        let heildarlaun = (laun_orlof + laun_desember)/12 + laun_yfirvinna/6 + grunnlaun;
        let launastrengur = `(${laun_desember} + ${laun_orlof})/12 +  ${laun_yfirvinna.toFixed(1).toString().replace('.',',')}/6 + ${grunnlaun} = ${heildarlaun.toFixed(1).toString().replace('.',',')} kr.`;
    	return (
    		<div className="kennariRammi">
    		  <h4>Niðurstaða fyrir eina önn/misseri í fullu starf: </h4>

    		  <div className="nidurstadaKennara">
                <div className="listarNidurstodurKennarar">
                 <h5><strong>Vinnumat A-hluta: {vinnumat_a.toFixed(1).toString().replace('.',',')} klst.</strong></h5>
                     <ListGroup>
                        {
                         [...this.props.kennari.afangar.values()].map(afangi=> (
                            <ListGroupItem key={afangi.heiti}>{afangi.heiti}, vinnumat: {afangi.vinnumat_hopa.reduce(function(a,b){
                                        return a + b.vinnumat_skert;
                                    },0).toFixed(1).replace('.',',')}
                            
                                <ul>
                                {afangi.vinnumat_hopa.length > 1 && afangi.vinnumat_hopa.map(item => (<li key={item.hopur}>Hópur {item.hopur}: {item.vinnumat_skert.toFixed(1).toString().replace('.',',')} klst.</li>))}
                                </ul>
                            
                            </ListGroupItem>
                            
                         ))

                        }                   
                    </ListGroup>
                </div>
                <div className="listarNidurstodurKennarar">
                 <h5><strong>Vinnumat B-hluta: 180 klst.</strong></h5>
                 <ListGroup></ListGroup>
                </div>
                <div className="listarNidurstodurKennarar">
                 <h5><strong>Vinnumat C-hluta: {this.props.kennari.cHluti} klst.</strong></h5>
                 <ListGroup></ListGroup>
                </div>
                <div className="listarNidurstodurKennarar">
                 <h5><strong>Vinnumat (samtals): {(parseFloat(this.props.kennari.cHluti) + vinnumat_a + 180).toFixed(1).toString().replace('.',',')} klst.</strong></h5>
                 <ListGroup></ListGroup>
                </div>
                <div className="listarNidurstodurKennarar">
                 <h5><strong>Vinnuskylda (A-hluti): {vinnuskylda} {kennsluafslattur !== 0 && 
                    <span>- {((kennsluafslattur*100).toFixed(2)).toString().replace('.',',')}% &times; {vinnuskylda_breytt} = {(vinnuskylda - kennsluafslattur*vinnuskylda_breytt).toFixed(1).toString().replace('.',',')}</span>} klst.</strong></h5>
                </div>
                <div className="listarNidurstodurKennarar">
                 <h5><strong>Yfirvinna: {yfirvinna.toFixed(1).toString().replace('.',',')} klst.</strong></h5>
                </div>

    			<div className="listarNidurstodurKennarar">
    			 <h5><strong>Laun:</strong></h5>
    			     <ListGroup>
                        <ListGroupItem>Launaflokkur og þrep: {launaflokkur} og {threp}</ListGroupItem>
                        <ListGroupItem>Grunnlaun: {grunnlaun} kr.</ListGroupItem>
                        <ListGroupItem>Desemberuppbot: {laun_desember} kr.</ListGroupItem>
                        <ListGroupItem>Orlofsuppbot: {laun_orlof} kr.</ListGroupItem>
                        <ListGroupItem>Laun vegna yfirvinnu: {laun_yfirvinna.toFixed(1).toString().replace('.',',')} kr.</ListGroupItem>
                        <ListGroupItem>Laun á mánuði: {launastrengur}</ListGroupItem>
		         
                    </ListGroup>
    		    </div>
               </div>
            </div>
    			
    	)

	}
}

export default KennariForm