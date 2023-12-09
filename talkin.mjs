/* Basic Method */
function isClass(sth){return typeof sth == 'function' && sth?.prototype?.constructor === sth;}

/* Prifix Function */
export function a(sth){return sth;}
export function an(sth){return sth;}
export function the(sth){if(isClass(sth)) return new (sth)(); else return sth;}

/* Class */
export class Something{
	static #subset = [];
	#entitySubset = [];
	#superset = [];
	constructor(info = {}){
	}
	static contain(sth){
		Something.#subset.push(sth);
	}
	static _contain(sth){
		return Something.#subset.includes(sth);
	}
	contain(sth){
		this.#entitySubset.push(sth);
	}
	_contain(sth){
		return this.#entitySubset.includes(sth);
	}
	belongs(type, autoEqual = true){
		this.#superset.push(type);
		type.contain(this);
		if(autoEqual && type?.belongs) type.belongs(this, false);
	}
	_belongs(type){
		return(
			(this.#superset.includes(type) && type._contain(this)) || // if it has set to belong to the type
			type === this?.__proto__?.constructor || // if the type is it's class
			(this.#superset.map(sth => sth?._belongs ? sth._belongs(type) : false).includes(true)) || // if it's superset belongs to the type
			this == type // if the type is itself
		);
	}
}
export class Ordinal extends Something{
	static #subset = [];
	static #data = new Map();
	#number = 0;
	constructor(number = 1){
		super();
		this.#number = number;
	}
	static contain(sth){
		Ordinal.#subset.push(sth);
	}
	static _contain(sth){
		return Ordinal.#subset.includes(sth);
	}
	contain(sth){
		if(Ordinal.#data[this] == undefined){Ordinal.#data[this] = [];}
		Ordinal.#data[this].push(sth);
	}
	_contain(sth){
		return Ordinal.#data[this] !== undefined && Ordinal.#data[this].includes(sth);
	}
	get number(){return this.#number;}
	set number(number){this.#number = number;}
}
export class Pronoun extends Something{
	static #subset = [];
	constructor(personSingular){
		super();
		this.personSingular = personSingular ? personSingular : new Ordinal(3);
	}
	static contain(sth){
		Pronoun.#subset.push(sth);
	}
	static _contain(sth){
		return Pronoun.#subset.includes(sth);
	}
	am (...param){if(this.personSingular.number == 1) super.belongs(...param); else throw Error;}
	are(...param){if(this.personSingular.number == 2) super.belongs(...param); else throw Error;}
	is (...param){if(this.personSingular.number == 3) super.belongs(...param); else throw Error;}
	_am (...param){if(this.personSingular.number == 1) return super._belongs(...param); else throw Error;}
	_are(...param){if(this.personSingular.number == 2) return super._belongs(...param); else throw Error;}
	_is (...param){if(this.personSingular.number == 3) return super._belongs(...param); else throw Error;}
}