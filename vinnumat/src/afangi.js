
class Afangi {

	constructor (info_object) {
		
		this.heiti = info_object.heiti;
		this.vikur = parseFloat(info_object.vikur);
		this.einingar = parseFloat(info_object.einingar);
		this.hlutfall = parseFloat(info_object.hlutfall);
		this.kstundirAviku = parseFloat(info_object.kstundirAviku);
		this.lengdKennslustunda = parseFloat(info_object.lengdKennslustunda);
		this.synidaemi = info_object.synidaemi;
		this.hopar = []
		for (let hopur in info_object.hopar.slice(0,info_object.hopar.length))
			this.hopar.push(parseFloat(hopur));
		this.vikur = info_object.hopar;
	}

	vinnumat() {
		console.log(this);
		return 0;
	}
}

export default Afangi