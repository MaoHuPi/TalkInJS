/* Basic Method */
function isClass(v) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}
export function thingsInit(sth){
    if(isClass(sth)){
        sth.prototype.subset = [];
        sth.contain = function(target){sth.prototype.subset.push(target);};
        sth._contain = function(target){return sth.prototype.subset.includes(target);};
    }
    return sth;
}

/* Prifix Function */
export function the(sth){if(isClass(sth)) return new (sth)(); else return sth;}

/* Class about Time */
export class Timeline {
    #elements = [];
    push(...elements){this.#elements.push(...elements);}
    pass(time, baseOn = 1){
        for(let i = 0; i < Math.floor(time/baseOn); i++){
            this.#elements.forEach(element => element.timePass(baseOn));
        }
    }
}
export class State {
    #func = function(){};
    constructor(func = function(){}){
        this.#func = func;
    }
    affect(time, value, stateData){
        this.#func.bind(stateData)(value*time);
    }
}
export class StateValuePair {
    #state;
    #value;
    constructor(state, value = 1){
        this.#state = state;
        this.#value = value;
    }
    get state(){return this.#state;}
    get value(){return this.#value;}
}

/* Class about Things */
export class Something {
    // static #subset = [];
    #entitySubset = [];
    #superset = [];
    #initTime = 0;
    #stateData = new Map();
    constructor(info = {}){
        this.#initTime = Date.now();
    }
    // static contain(sth){Something.#subset.push(sth);}
    // static _contain(sth){return Something.#subset.includes(sth);}
    get initTime(){return this.#initTime;}
    // get stateData(){return this.#stateData;}
    contain(sth){
        this.#entitySubset.push(sth);
    }
    _contain(sth){
        return this.#entitySubset.includes(sth);
    }
    belongs(type, autoEqual = true){
        this.#superset.push(type);
        type.contain(this);
        if(autoEqual && type?.belongs){
            if(this.initTime > type.initTime) this.binding(type);
            else type.binding(this);
            type.belongs(this, false);
        };
    }
    _belongs(type, autoEqualList = []){
        autoEqualList.push(this);
        return(
            (this.#superset.includes(type) && type._contain(this)) || // if it has set to belong to the type
            type === this?.__proto__?.constructor || // if the type is it's class
            (this.#superset
                .filter(sth => !autoEqualList.includes(sth))
                .map(sth => sth?._belongs ? sth._belongs(type, autoEqualList) : false)
                .includes(true)
            ) || // if it's superset belongs to the type
            this == type // if the type is itself
        );
    }
    ownState(state, value){this.#stateData.set(state, value);}
    _ownState(state){return this.#stateData.get(state) !== undefined;}
    how(state){return this.#stateData.get(state);}
    binding(sth){this.#stateData = sth.stateData;}
    timePass(time){
        [...this.#stateData.keys()].forEach(state => state.affect(time, this.#stateData.get(state), this.#stateData));
    }
}
thingsInit(Something);
export class Ordinal extends Something {
    // static #subset = [];
    static #data = new Map();
    #number = 0;
    constructor(number = 1){
        super();
        this.#number = number;
    }
    // static contain(sth){Ordinal.#subset.push(sth);}
    // static _contain(sth){return Ordinal.#subset.includes(sth);}
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
thingsInit(Ordinal);
export class Pronoun extends Something {
    // static #subset = [];
    constructor(personSingular){
        super();
        this.personSingular = personSingular ? personSingular : new Ordinal(3);
    }
    // static contain(sth){Pronoun.#subset.push(sth);}
    // static _contain(sth){return Pronoun.#subset.includes(sth);}
    am (sth){if(this.personSingular.number == 1) this.be(sth); else throw Error;}
    are(sth){if(this.personSingular.number == 2) this.be(sth); else throw Error;}
    is (sth){if(this.personSingular.number == 3) this.be(sth); else throw Error;}
    _am (sth){if(this.personSingular.number == 1) return this._be(sth); else throw Error;}
    _are(sth){if(this.personSingular.number == 2) return this._be(sth); else throw Error;}
    _is (sth){if(this.personSingular.number == 3) return this._be(sth); else throw Error;}
    be(sth){
        if(sth.constructor === State){
            this.ownState(sth, 1);
        }
        else if(sth.constructor === StateValuePair){
            this.ownState(sth.state, sth.value);
        }
        else{
            this.belongs(sth);
        }
    }
    _be(sth){
        if(sth.constructor === State){
            return this._ownState(sth);
        }
        else if(sth.constructor === StateValuePair){
            return this.how(sth.state) === sth.value;
        }
        else{
            return this._belongs(sth);
        }
    }
}
thingsInit(Pronoun);