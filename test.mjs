import {a, an, the, Something, Ordinal, Pronoun} from './talkin.mjs';

/* Personal Pronoun */
const I = new Pronoun(new Ordinal(1));

/* Indefinite Article */
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
I.am(a(Dog));
console.log('Am \'I\' a \'Dog\'?', I._am(Dog)); // true

/* Definite Article */
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

/* Ordinal */
let first = new Ordinal(1);
I.am(the(first)); // the(first) === first
console.log('Am \'I\' the \'first\'?', I._am(first)); // true
console.log('Is \'first\' \'I\'?', first._belongs(I)); // true
let anotherFirst = new Ordinal(1);
console.log('Is \'anotherFirst\' \'I\'?', anotherFirst._belongs(I)); // true

/*  */