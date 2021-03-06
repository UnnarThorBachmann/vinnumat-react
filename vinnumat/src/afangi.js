import Synidaemi from './synidaemi.js';

class Afangi {

	constructor (info_object) {
		this.heiti = info_object.heiti;
		this.vikur = parseFloat(info_object.vikur.replace(',','.'));
		this.einingar = parseFloat(info_object.einingar.replace(',','.'));
		this.kstundirAviku = parseFloat(info_object.kstundirAviku.replace(',','.'));
		this.lengdKennslustunda = parseFloat(info_object.lengdKennslustunda.replace(',','.'));
		this.synidaemi = Synidaemi[info_object.synidaemi];
		this.hopar = []
		for (let hopur in info_object.hopar.slice(0,info_object.hopar.length-1))
			this.hopar.push(parseFloat(info_object.hopar[hopur].replace(',','.')));

		this.stadin_kennsla = 0;
		this.undirbuningur = 0;
		this.fastur = 0;
		this.skiptitimar = info_object.skiptitimar;

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

	discount(hopar) {
		if (hopar.length === 1)
			return hopar;

		let heildarfjoldi = 0;
		for (let hopur of hopar) {
			heildarfjoldi += hopur.fjoldi;
		}	
		let medaltal = parseFloat(heildarfjoldi/(hopar.length));
		let vinnumat_skuggi = hopar[0].vinna_stadin 
							  + hopar[0].vinna_undirbuningur
							  + hopar[0].vinna_fastur;
		
		vinnumat_skuggi += this.vinna_vegna_nemenda(medaltal);
		let n = hopar.length;
		let skerdingarprosenta;

		if (this.synidaemi.heiti === 'Raungreinar' && this.skiptitimar != '0') {
				let hf_skiptitimar = 0.625*parseFloat(this.skiptitimar)/(parseFloat(this.kstundirAviku)*parseFloat(this.lengdKennslustunda));
				vinnumat_skuggi = vinnumat_skuggi + hf_skiptitimar*vinnumat_skuggi;
		}
		
		if (n  <= 3)
			skerdingarprosenta = 0.08*(n-1)/n;
		else
			skerdingarprosenta = 0.08*(n-2)/n;

		for (let hopur of hopar) {
			hopur.skerdingarprosenta = skerdingarprosenta;
			hopur.skerding = vinnumat_skuggi*skerdingarprosenta;
			hopur.vinnumat_skert = hopur.vinnumat - hopur.skerding;
		}
		
		return hopar
	}

	vinnumat() {
		
		this.stadin_kennsla = parseFloat(this.vikur*this.kstundirAviku*this.lengdKennslustunda)/parseFloat(60);



		this.undirbuningur = parseFloat(this.vikur*this.kstundirAviku*this.lengdKennslustunda)/parseFloat(40)*parseFloat(this.synidaemi.undirb_kennslu)/parseFloat(60);
		this.fastur = this.synidaemi['onnur_vinna'] + this.synidaemi['timar_namsAetlun'] + this.synidaemi['verkefnisgerd'];

		if (this.synidaemi.heiti === 'Raungreinar' && this.skiptitimar != '0') {
			this.fastur =this.fastur-7.5;

		}

		let vinnumat_hopa = [];
		let i = 1;
		for (let fjoldi of this.hopar) {
			let vinnumat = this.stadin_kennsla + this.undirbuningur + this.fastur + this.vinna_vegna_nemenda(fjoldi);
			let skiptitimar = 0;
			if (this.synidaemi.heiti === 'Raungreinar' && this.skiptitimar != '0') {
				let hf_skiptitimar = 0.625*parseFloat(this.skiptitimar)/(parseFloat(this.kstundirAviku)*parseFloat(this.lengdKennslustunda));
				skiptitimar = hf_skiptitimar*vinnumat;
				vinnumat = vinnumat  + skiptitimar;
				
			}
			vinnumat_hopa.push({'hopur': i,
				'vinna_stadin': this.stadin_kennsla,
				'vinna_undirbuningur': this.undirbuningur,
				'vinna_fastur': this.fastur,
				'vinna_vegna_nemenda': this.vinna_vegna_nemenda(fjoldi),
				'vinnumat': vinnumat,
				'vinnumat_skert': vinnumat,
				'fjoldi': fjoldi,
				'hlutfall': 100,
				'skiptitimar': skiptitimar
			});
			i += 1;
		}
		vinnumat_hopa = this.discount(vinnumat_hopa);
		let afangi = {};
		afangi.heiti = this.heiti;
		afangi.vikur = this.vikur; 
		afangi.einingar = this.einingar; 
		afangi.kstundirAviku = this.kstundirAviku; 
		afangi.lengdKennslustunda = this.lengdKennslustunda; 
		afangi.synidaemiHeiti = this.synidaemi.heiti;
		if (this.synidaemi.heiti === 'Raungreinar' && this.skiptitimar != '0') {
			afangi.onnur_vinna = 0;
		}
		else {
			afangi.onnur_vinna=this.synidaemi['onnur_vinna'];
		}
		afangi.namsaetlun = this.synidaemi['timar_namsAetlun'];
		afangi.verkefnisgerd = this.synidaemi['verkefnisgerd'];
		afangi.vinnumat_hopa = vinnumat_hopa;
		if (this.synidaemi.heiti === 'Raungreinar' && this.skiptitimar != '0') {
			afangi.skiptitimar = this.skiptitimar;
		}

		return afangi;
	}
}

export default Afangi