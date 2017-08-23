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
		let alag_20 = this.synidaemi.kostn_per_nem_yn;
		let alag_100 = this.synidaemi.kostn_per_nem_ye;
		let lagmark = this.synidaemi.lagmark;
		let hamark_e = this.synidaemi.hamark_e;
		let hamark_n = this.synidaemi.hamark_n;
		let vinna_per_nemanda = this.synidaemi.vinna_per_nemanda;

		let vinnumat = 0;

		if (nemfjoldi-hamark_e > 0) {
			vinnumat += (nemfjoldi-hamark_e)*alag_100;
			nemfjoldi = hamark_e;
		}

		if (nemfjoldi-hamark_n > 0 ) {
			vinnumat += (nemfjoldi-hamark_n)*alag_20;
			nemfjoldi = hamark_n;
		}

		if (nemfjoldi-lagmark > 0 ) {
			vinnumat += (nemfjoldi-lagmark)*vinna_per_nemanda/60;
			
		}

		nemfjoldi = lagmark;
		vinnumat += lagmark*vinna_per_nemanda/60;

		return vinnumat;

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
					  + this.synidaemi['verkefnisgerd'];

		let vinnumat_hopa = [];
		let i = 1;
		for (let fjoldi of this.hopar) {
			vinnumat_hopa.push({'hopur': i,
				'vinna_stadin': this.stadin_kennsla,
				'vinna_undirbuningur': this.undirbuningur,
				'vinna_fastur': this.fastur,
				'vinna_vegan_nemenda': this.vinna_vegna_nemenda(fjoldi),
				'vinnumat': this.stadin_kennsla + this.undirbuningur + this.fastur + this.vinna_vegna_nemenda(fjoldi)
			});
			i += 1;
		}
		
		return vinnumat_hopa;
	}
}

export default Afangi