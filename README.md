# TalkInJS

> 2023 &copy; MaoHuPi

> Use almost the same way to express things, but this library makes it substantive.

## Examples

* Import 
	```mjs
	import {the, Something, Ordinal, Pronoun} from './talkin.mjs';
	```

* Personal Pronoun
	```js
	const I = new Pronoun(new Ordinal(1));
	```

* Indefinite Article
	```js
	class Dog extends Something{
	    static #subset = [];
	    constructor(info = {}){super();}
	    static contain(something){
	        Dog.#subset.push(something);
	    }
	    static _contain(something){
	        return Dog.#subset.includes(something);
	    }
	}
	I.am(Dog);
	console.log('Am \'I\' a \'Dog\'?', I._am(Dog)); // true
	```

* Definite Article
	```js
	class Cat extends Something{
	    static #subset = [];
	    constructor(info = {}){super();}
	    static contain(something){
	        Cat.#subset.push(something);
	    }
	    static _contain(something){
	        return Cat.#subset.includes(something);
	    }
	}
	let the_cat = the(Cat);
	console.log('Is \'the_cat\' a \'Cat\'?', the_cat._belongs(Cat)); // true
	I.am(the_cat);
	console.log('Am \'I\' \'the_cat\'?', I._am(the_cat)); // true
	console.log('Am \'I\' a \'Cat\'?', I._am(Cat)); // true
	console.log('Is \'the_cat\' \'I\'?', the_cat._belongs(I)); // true
	```

* Ordinal
	```js
	let first = new Ordinal(1);
	I.am(the(first)); // the(first) === first
	console.log('Am \'I\' the \'first\'?', I._am(first)); // true
	console.log('Is \'first\' \'I\'?', first._belongs(I)); // true
	let anotherFirst = new Ordinal(1);
	console.log('Is \'anotherFirst\' \'I\'?', anotherFirst._belongs(I)); // true
	```

* Feeling and State
	```js
	const I = new Pronoun(new Ordinal(1));
	const hour = 1;
	function very(state){
	    return new StateValuePair(state, 1.2);
	}
	function quite(state){
	    return new StateValuePair(state, 0.1);
	}
	let world = new Timeline();
	let satiety = new State();
	let hungry = new State(function(deltaVelue){
	    this.set(satiety, this.get(satiety) - deltaVelue);
	});
	world.push(I);
	I.am(very(satiety));
	I.am(quite(hungry));
	console.log("Before '10 hour', 'satiety':", I.how(satiety)); // 1.2
	world.pass(10*hour, hour);
	console.log("After  '10 hour', 'satiety':", I.how(satiety)); // 1.20000000000000004
	console.log("Am 'I' 'hungry'?", I._am(hungry)); // true
	```