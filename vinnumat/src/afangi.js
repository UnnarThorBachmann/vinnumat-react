import Synidaemi from './synidaemi.js';

class Afangi {

	constructor (info_object) {
		this.heiti = info_object.heiti;
		this.vikur = parseFloat(info_object.vikur);
		this.einingar = parseFloat(info_object.einingar);
		this.hlutfall = parseFloat(info_object.hlutfall);
		this.kstundirAviku = parseFloat(info_object.kstundirAviku);
		this.lengdKennslustunda = parseFloat(info_object.lengdKennslustunda);
		this.synidaemi = Synidaemi[info_object.synidaemi];
		this.hopar = []
		for (let hopur in info_object.hopar.slice(0,info_object.hopar.length-1))
			this.hopar.push(parseFloat(info_object.hopar[hopur]));

		this.stadin_kennsla = 0;
		this.undirbuningur = 0;
	}

	vinna_vegna_nemenda(nemfjoldi) {
		if (nemfjoldi < this.synidaemi.lagmark)
			return this.synidaemi.lagmark*this.vinna_per_nemanda/parseFloat(60);
	}

	vinnumat() {
		console.log('Vikur',this.vikur);
		console.log('Einingar',this.einingar);
		console.log('Fjöldi kennslustunda á viku',this.kstundirAviku);
		console.log('Lengd kennslustunda', this.lengdKennslustunda);
		console.log('Hópar',this.hopar);
		console.log('Sýnidæmi',this.synidaemi);


		this.stadin_kennsla = parseFloat(this.vikur*this.kstundirAviku*this.lengdKennslustunda)/parseFloat(60);
		this.undirbuningur = parseFloat(this.vikur*this.kstundirAviku*this.lengdKennslustunda)/parseFloat(40)*parseFloat(20)/parseFloat(60);
		this.fastur = this.synidaemi['onnur_vinna'] 
					  + this.synidaemi['timar_namsAetlun'] 
					  + this.synidaemi['undirb_kennslu'] 
					  + this.synidaemi['verkefnisgerd'];
		const fj = this.hopar[0];
		this.vinna_vegna_nemenda(fj);

		console.log(this.stadin_kennsla);
		console.log(this.undirbuningur);
		console.log(this.fastur);

		return 0;
	}
}

export default Afangi